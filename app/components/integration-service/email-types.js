import Ember from 'ember';
import promisify from 'admin/utils/wrap-ajax';

const { Component, computed, inject: { service }, $ } = Ember;

export default Component.extend({
  service: null,
  loading: false,
  loaded: false,
  deploymentTypes: null,

  deploymentSort: ['name'],
  deploymentTypesSorted: computed.sort('deploymentTypes', 'deploymentSort'),

  errorProcessor: service(),

  actions: {
    retrieve() {
      this.set('loading', true);
      this.set('loaded', false);
      promisify($.ajax(`/service/deployment-types/${this.get('service.id')}`, {
        method: 'GET',
      }))
      .then((response) => this.set('deploymentTypes', response.response.data))
      .catch((json) => this.get('errorProcessor').notify(json.errors || []))
      .finally(() => {
        this.set('loading', false);
        this.set('loaded', true);
      });
    },
  },
});
