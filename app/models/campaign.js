import Model from 'ember-data/model';
import SoftDeleteable from 'admin/models/mixins/soft-deleteable';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { fragmentArray } from 'ember-data-model-fragments/attributes';

export default Model.extend(SoftDeleteable, {
  name: attr('string'),
  promoCode: attr('string'),
  service: belongsTo('integration-service', { polymorphic: true }),
  targets: fragmentArray('component-target'),
  cookies: fragmentArray('identification-cookie'),
  forms: fragmentArray('campaign-form'),
});
