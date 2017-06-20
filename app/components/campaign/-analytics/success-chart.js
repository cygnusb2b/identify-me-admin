import Ember from 'ember';
import numeral from 'numeral';

const { Component, computed } = Ember;

export default Component.extend({

  data: {},

  _series: computed('data.focus.count', 'data.submit.count', function() {
    return {
      type: 'pie',
      name: 'Viewed to Submitted',
      data: [
        { y: this.get('data.focus.count') - this.get('data.submit.count'), name: 'Focused Only', color: '#434348' },
        { y: this.get('data.submit.count'), name: 'Submitted', color: '#90ed7d' },
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
            numeral(_this.get('data.focus.count')).format('0,0') + ' focused ' +
            '(' + numeral(this.y / _this.get('data.focus.count')).format('00.0%') + ')'
          ;
        }
      },
      series: [this.get('_series')],
    });
  }
});
