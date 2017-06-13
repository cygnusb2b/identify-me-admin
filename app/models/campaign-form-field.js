import Fragment from 'ember-data-model-fragments/fragment';
import attr from 'ember-data/attr';
import { array } from 'ember-data-model-fragments/attributes';

export default Fragment.extend({
  key: attr('string'),
  label: attr('string'),
  fieldType: attr('string'),
  required: attr('boolean', { defaultValue: false }),
  options: array(),
});
