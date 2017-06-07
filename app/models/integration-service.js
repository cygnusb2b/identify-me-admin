import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

const { computed } = Ember;

export default Model.extend({
  name: attr('string'),
  type: computed('typeKey', function() {
    const parts = this.get('typeKey').split('-');
    return parts.map((part) => Ember.String.capitalize(part)).join(' ');
  }),
  typeKey: computed(function() {
    return this.get('constructor.modelName').replace('integration-service-', '');
  }),
});
