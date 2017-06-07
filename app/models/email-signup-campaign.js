import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  callToAction: attr('string'),
  description: attr('string'),
  deploymentId: attr('string'),
  service: belongsTo('integration-service', { polymorphic: true }),
});
