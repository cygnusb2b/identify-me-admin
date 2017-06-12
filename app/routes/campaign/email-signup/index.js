import ListRoute from 'admin/routes/-list-route';

export default ListRoute.extend({
  model(params) {
    return this.retrieveModel('email-signup-campaign', params, { deleted: false });
  }
});
