import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { fragmentArray } from 'ember-data-model-fragments/attributes';

export default Model.extend({
  name: attr('string'),
  promoCode: attr('string'),
  callToAction: attr('string'),
  description: attr('string'),
  buttonValue: attr('string'),
  previewUrl: attr('string'),
  deploymentId: attr('string'),
  deploymentName: attr('string'),
  thankYouTitle: attr('string'),
  thankYouBody: attr('string'),
  service: belongsTo('integration-service', { polymorphic: true }),
  targets: fragmentArray('component-target'),
  cookies: fragmentArray('identification-cookie'),
});
