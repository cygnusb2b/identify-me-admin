import attr from 'ember-data/attr';
import IntegrationService from 'admin/models/integration-service';

export default IntegrationService.extend({
  appId      : attr('string'),
  brandKey   : attr('string'),
  clientKey  : attr('string'),
  inputId    : attr('string'),
  useStaging : attr('boolean', { defaultValue: false }),
});
