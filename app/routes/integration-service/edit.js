import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model(params) {
    return this.store.find(`integration-service-${params.type}`, params.id);
  },
});
