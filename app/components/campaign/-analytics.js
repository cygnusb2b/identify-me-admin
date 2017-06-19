import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  classNames: ['card', 'mb-3'],
  campaignAnalytics: service(),

  isNew: false,
  campaignId: null,
  form: null,
  loading: false,

  report: null,

  init() {
    this._super(...arguments);
    this.send('loadAnalytics');
  },

  actions: {
    loadAnalytics() {
      if (this.get('isNew')) {
        return;
      }
      this.set('loading', true);
      this.get('campaignAnalytics').retrieve(this.get('campaignId'), this.get('form.identifier'))
        .then((report) => {
          this.set('report', report);
        })
        .finally(() => this.set('loading', false))
      ;
    },
  },

});
