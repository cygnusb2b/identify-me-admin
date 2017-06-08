import Ember from 'ember';
import promisify from 'admin/utils/wrap-ajax';

const { Service, inject: { service }, $ } = Ember;

export default Service.extend({
  errorProcessor: service(),

  retrieve(id) {
    return promisify($.ajax(`/service/deployment-types/${id}`, {
      method: 'GET',
    }))
    .then((response) => response.response.data)
    .catch((json) => this.get('errorProcessor').notify(json.errors || []))
  },
});
