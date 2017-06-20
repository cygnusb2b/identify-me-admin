import Ember from 'ember';
import numeral from 'numeral';

const { Component, computed } = Ember;

export default Component.extend({

  data: {},

  _series: computed('data.view.count', 'data.focus.count', 'data.submit.count', function() {
    return {
      type: 'pie',
      name: 'Viewed to Submitted',
      data: [
        { y: this.get('data.view.count') - (this.get('data.focus.count') + this.get('data.submit.count')), name: 'Viewed Only' },
        { y: this.get('data.focus.count'), name: 'Focused' },
        { y: this.get('data.submit.count'), name: 'Submitted', sliced: true },
      ],
    };
  }),

  didInsertElement() {
    const _this = this;
    this.$().highcharts({
      title: {
          text: null
      },
      tooltip: {
        formatter: function() {
          return '<b>'+ this.point.name +'</b><br/>'+
            numeral(this.y).format('0,0') + ' of ' +
            numeral(_this.get('data.view.count')).format('0,0') + ' viewed ' +
            '(' + numeral(this.y / _this.get('data.view.count')).format('00.0%') + ')'
          ;
        }
      },
      series: [this.get('_series')],
    });
  }
});
