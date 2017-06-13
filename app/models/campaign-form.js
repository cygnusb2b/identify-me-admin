import Fragment from 'ember-data-model-fragments/fragment';
import attr from 'ember-data/attr';
import { fragmentArray } from 'ember-data-model-fragments/attributes';

export default Fragment.extend({
  name: attr('string'),
  active: attr('boolean', { defaultValue: true }),
  fields: fragmentArray('campaign-form-field'),
});
