import ListRoute from 'admin/routes/-list-route';

export default ListRoute.extend({
  model(params) {
    return this.retrieveModel('integration-service', params);
  }
});
