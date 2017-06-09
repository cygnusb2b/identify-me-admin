import Ember from 'ember';

const { Component, inject: { service }, computed, observer } = Ember;

export default Component.extend({
  store: service(),
  emailTypeLoader: service(),

  campaign: null,

  services: [],
  deploymentTypes: [],

  defaults: {
    cta: 'Stay up to date!',
    desc: 'Subscribe to our newsletter to receive the latest industry news.',
    button: 'Sign up!',
    service: { id: '', fullName: 'Please Select...' },
    deployment: { identifier: '', fullName: 'Please Select...' },
  },

  isLoaded: {
    services: false,
    deployments: false,
  },

  isLoading: {
    services: true,
    deployments: false,
  },

  isValid: computed('hasService', 'hasDeployment', function() {
    return this.get('hasService') && this.get('hasDeployment') ? true : false;
  }),

  hasService: computed('campaign.service.id', 'isLoaded.services', function() {
    return this.get('campaign.service.id') && this.get('isLoaded.services') ? true : false;
  }),

  hasDeployment: computed('campaign.deploymentId', 'isLoaded.deployments', function() {
    return this.get('campaign.deploymentId') && this.get('isLoaded.deployments') ? true : false;
  }),

  init() {
    this._super(...arguments);
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
          this.send('loadDeployments', this.get('campaign.service.id'), false);
        })
        .catch(adapterError => this.get('errorProcessor').notify(adapterError.errors || []))
        .finally(() => this.setLoading('services', false))
      ;
    },

    loadDeployments(serviceId, resetDeployment = true) {
      // Reset the deployment types to their defaults.
      this.get('deploymentTypes')
        .clear()
        .pushObject(this.get('defaults.deployment'))
      ;

      // Ensure campaign's deployment id and name are reset.
      if (resetDeployment) {
        this.set('campaign.deploymentId', null);
        this.set('campaign.deploymentName', null);
      }

      this.send('checkValidity');
      if (!serviceId) {
        // Service de-selected. Do not load.
        return;
      }
      this.setLoading('deployments');
      this.setLoaded('deployments', false);
      this.get('emailTypeLoader').retrieve(serviceId)
        .then((types) => {
          types.forEach((type) => this.get('deploymentTypes').pushObject(type));
          this.setLoaded('deployments');
          this.send('checkValidity');
        })
        .catch((json) => this.get('errorProcessor').notify(json.errors || []))
        .finally(() => this.setLoading('deployments', false))
      ;
    },

    checkValidity() {
      this.sendAction('on-check-validity', this.get('isValid'));
    },
  },

});
