import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    return this.store.createRecord('campaign-gated-content');
  },
});