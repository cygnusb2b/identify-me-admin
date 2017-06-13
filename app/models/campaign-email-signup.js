import Campaign from 'admin/models/campaign';
import attr from 'ember-data/attr';
import { fragment } from 'ember-data-model-fragments/attributes';

export default Campaign.extend({
  deploymentId: attr('string'),
  deploymentName: attr('string'),
  props: fragment('email-signup-props', { defaultValue: {} }),
});
