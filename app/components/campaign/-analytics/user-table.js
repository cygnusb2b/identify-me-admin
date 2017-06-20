import Ember from 'ember';

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
      aaSorting: [],
      buttons: [
        { extend: 'excelHtml5', title: title },
        { extend: 'csvHtml5', title: title },
      ],
    });

    $(table.table().container()).addClass('px-0');

    table.buttons().container()
      .addClass('float-right')
      .appendTo('#' + this.$().attr('id') + '_wrapper .col-md-6:eq(1)')
    ;
  },
});
