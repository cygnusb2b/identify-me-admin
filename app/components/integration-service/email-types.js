import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  service: null,
  loading: false,
  loaded: false,
  deploymentTypes: null,

  deploymentSort: ['name'],
  deploymentTypesSorted: computed.sort('deploymentTypes', 'deploymentSort'),

  emailTypeLoader: service(),

  actions: {
    retrieve() {
      this.set('loading', true);
      this.set('loaded', false);
      this.get('emailTypeLoader').retrieve(this.get('service.id'))
        .then((types) => this.set('deploymentTypes', types))
        .finally(() => {
          this.set('loading', false);
          this.set('loaded', true);
        })
      ;
    },
  },
});
