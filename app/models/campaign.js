import Ember from 'ember';
import Model from 'ember-data/model';
import SoftDeleteable from 'admin/models/mixins/soft-deleteable';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { fragmentArray } from 'ember-data-model-fragments/attributes';

const { computed } = Ember;

export default Model.extend(SoftDeleteable, {
  name: attr('string'),
  promoCode: attr('string'),
  service: belongsTo('integration-service', { polymorphic: true }),
  targets: fragmentArray('component-target'),
  cookies: fragmentArray('identification-cookie'),
  setCookies: fragmentArray('identification-cookie'),
  forms: fragmentArray('campaign-form'),
  type: computed('typeKey', function() {
    const parts = this.get('typeKey').split('-');
    return parts.map((part) => Ember.String.capitalize(part)).join(' ');
  }),
  typeKey: computed(function() {
    return this.get('constructor.modelName').replace('campaign-', '');
  }),
});
