import Ember from 'ember';

const { Component, computed, inject: {  service }, run } = Ember;

export default Component.extend({
  classNames: ['form-group'],

  service: null,
  loading: false,
  services: null,

  selected: computed('service.id', function() {
    const id = this.get('service.id');
    return (id) ? id : "";
  }),

  // store: service(),
  // errorProcessor: service(),

  // init() {
  //   this._super(...arguments);
  //   this._loadServices();
  // },

  // _loadServices() {
  //   this.get('services').clear().pushObject({ id: "", fullName: "Please Select..." });
  //   this.set('loading', true);
  //   this.get('store').query('integration-service', {})
  //     .then((services) => {
  //       services.forEach((service) => this.get('services').pushObject(service));
  //       run.schedule('actions', this, function() {
  //         console.info('on-services-loaded', this.get('selected'), this.get('service'));
  //         this.sendAction('on-services-loaded', this.get('selected'), this.get('service'));
  //       });
  //     })
  //     .catch(adapterError => this.get('errorProcessor').notify(adapterError.errors))
  //     .finally(() => {
  //       this.set('loading', false)
  //     })
  //   ;
  // },

  actions: {
    selectService(id) {
      const model = (id) ? this.get('services').findBy('id', id) : null;
      this.set('service', model);
      this.sendAction('on-service-change', id, model);
    },
  },
});
