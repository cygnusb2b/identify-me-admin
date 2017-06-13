import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model(params) {
    return this.store.find('campaign-gated-content', params.id);
  },
});
