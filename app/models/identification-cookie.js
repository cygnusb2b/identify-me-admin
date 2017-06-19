import Fragment from 'ember-data-model-fragments/fragment';
import attr from 'ember-data/attr';

export default Fragment.extend({
  name: attr('string'),
  value: attr('string'),
  expires: attr('number'),
});
