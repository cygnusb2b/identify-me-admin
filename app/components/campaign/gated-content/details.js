import Ember from 'ember';

const { Component, inject: { service }, computed } = Ember;

export default Component.extend({
  store: service(),
  emailTypeLoader: service(),

  campaign: null,

  services: [],

  defaults: {
    title: 'This content is exclusive to subscribers.',
    description: 'To continue reading this content, please complete the following information.',
    fullRegisterDescription: 'To continue reading this content, please click here to register.',
    buttonValue: 'Continue',
    registerUrl: '',
    service: { id: '', fullName: 'Please Select...' },
  },

  isLoaded: {
    services: false,
  },

  isLoading: {
    services: true,
  },

  isValid: computed('hasService', function() {
    return this.get('hasService') ? true : false;
  }),

  hasService: computed('campaign.service.id', 'isLoaded.services', function() {
    return this.get('campaign.service.id') && this.get('isLoaded.services') ? true : false;
  }),

  init() {
    this._super(...arguments);
    if (!this.get('campaign.props')) {
      this.set('campaign.props', {});
    }
    this.send('checkValidity');
    this.send('loadServices');
  },

  setLoading(type, bit = true) {
    const key = `isLoading.${type}`;
    this.set(key, bit);
  },

  setLoaded(type, bit = true) {
    const key = `isLoaded.${type}`;
    this.set(key, bit);
  },

  actions: {
    loadServices() {
      this.get('services')
        .clear()
        .pushObject(this.get('defaults.service'))
      ;

      this.setLoading('services');
      this.setLoaded('services', false);
      this.get('store').query('integration-service', {})
        .then((services) => {
          services.forEach((service) => this.get('services').pushObject(service));
          this.setLoaded('services');
          this.send('checkValidity');
        })
        .catch(adapterError => this.get('errorProcessor').notify(adapterError.errors || []))
        .finally(() => this.setLoading('services', false))
      ;
    },

    checkValidity() {
      this.sendAction('on-check-validity', this.get('isValid'));
    },
  },

});
