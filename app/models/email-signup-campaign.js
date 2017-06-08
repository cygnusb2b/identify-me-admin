import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  callToAction: attr('string'),
  description: attr('string'),
  buttonValue: attr('string'),
  deploymentId: attr('string'),
  deploymentName: attr('string'),
  service: belongsTo('integration-service', { polymorphic: true }),
});
