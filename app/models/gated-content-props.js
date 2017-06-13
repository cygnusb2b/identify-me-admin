import Fragment from 'ember-data-model-fragments/fragment';
import attr from 'ember-data/attr';

export default Fragment.extend({
  title: attr('string'),
  description: attr('string'),
  fullRegisterDescription: attr('string'),
  registerUrl: attr('string'),
  buttonValue: attr('string'),
});
