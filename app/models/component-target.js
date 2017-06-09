import Fragment from 'ember-data-model-fragments/fragment';
import attr from 'ember-data/attr';

export default Fragment.extend({
  host: attr('string'),
  path: attr('string'),
  selector: attr('string'),
});
