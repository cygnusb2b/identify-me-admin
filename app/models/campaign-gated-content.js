import Campaign from 'admin/models/campaign';
import { fragment } from 'ember-data-model-fragments/attributes';

export default Campaign.extend({
  props: fragment('gated-content-props', { defaultValue: {} }),
});
