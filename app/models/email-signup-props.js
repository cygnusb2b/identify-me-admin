import Fragment from 'ember-data-model-fragments/fragment';
import attr from 'ember-data/attr';

export default Fragment.extend({
  callToAction: attr('string'),
  description: attr('string'),
  buttonValue: attr('string'),
  previewUrl: attr('string'),
  thankYouTitle: attr('string'),
  thankYouBody: attr('string'),
});
