import Ember from 'ember';
import moment from 'moment';

const { Component, $ } = Ember;

export default Component.extend({
  tagName: 'table',
  classNames: ['table'],

  title: 'Campaign report',
  labels: null,
  submissions: null,


  didInsertElement() {
    const title = this.get('title');
    const table = this.$().DataTable({
      aaSorting: [[0, 'desc']],
      buttons: [
        { extend: 'excelHtml5', title: title, exportOptions: { orthogonal: 'export' } },
        { extend: 'csvHtml5', title: title, exportOptions: { orthogonal: 'export' } },
      ],
      columnDefs: [
        {
          targets: 0,
          render: function(data, type) {
            if (type === 'display' && data) {
              return moment(data).fromNow();
            } else if (type === 'export' && data) {
              return moment(data).format('M/D/YYYY h:mm A');
            } else {
              return data;
            }
          }
        },
      ],
    });

    $(table.table().container()).addClass('px-0');

    table.buttons().container()
      .addClass('float-right')
      .appendTo('#' + this.$().attr('id') + '_wrapper .col-md-6:eq(1)')
    ;
  },
});
