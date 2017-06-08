import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({

  emailTypeLoader: service(),
  loading: service(),
  errorProcessor: service(),
  store: service(),
  routing: service('-routing'),

  campaign: null,

  services: [],
  deploymentTypes: [],

  isLoaded: {
    services: false,
    deployments: false,
  },

  isLoading: {
    services: true,
    deployments: false,
  },

  defaults: {
    cta: 'Stay up to date!',
    desc: 'Subscribe to our newsletter to receive the latest industry news.',
    button: 'Sign up!',
  },

  hasService: computed('campaign.service.id', 'isLoaded.services', function() {
    return this.get('campaign.service.id') && this.get('isLoaded.services') ? true : false;
  }),

  hasDeployment: computed('campaign.deploymentId', 'isLoaded.deployments', function() {
    return this.get('campaign.deploymentId') && this.get('isLoaded.deployments') ? true : false;
  }),

  canSave: computed('hasService', 'hasDeployment', function() {
    return this.get('hasService') && this.get('hasDeployment') ? true : false;
  }),

  init() {
    this._super(...arguments);
    this.send('loadServices');
  },

  actions: {
    loadServices() {
      this.get('services')
        .clear()
        .pushObject({ id: "", fullName: "Please Select..." })
      ;

      this.set('isLoading.services', true);
      this.set('isLoaded.services', false);
      this.get('store').query('integration-service', {})
        .then((services) => {
          services.forEach((service) => this.get('services').pushObject(service));
          this.set('isLoaded.services', true);
          this.send('loadDeployments', this.get('campaign.service.id'), false);
        })
        .catch(adapterError => this.get('errorProcessor').notify(adapterError.errors || []))
        .finally(() => this.set('isLoading.services', false))
      ;
    },
    loadDeployments(serviceId, resetDeployment = true) {
      // Reset the deployment types to their defaults.
      this.get('deploymentTypes')
        .clear()
        .pushObject({ identifier: '', fullName: 'Please Select...' })
      ;

      // Ensure campaign's deployment id and name are reset.
      if (resetDeployment) {
        this.set('campaign.deploymentId', null);
        this.set('campaign.deploymentName', null);
      }
      if (!serviceId) {
        // Service de-selected. Do not load.
        return;
      }
      this.set('isLoading.deployments', true);
      this.set('isLoaded.deployments', false);

      this.get('emailTypeLoader').retrieve(serviceId)
        .then((types) => {
          types.forEach((type) => this.get('deploymentTypes').pushObject(type));
          this.set('isLoaded.deployments', true);
        })
        .catch((json) => this.get('errorProcessor').notify(json.errors || []))
        .finally(() => this.set('isLoading.deployments', false))
      ;
    },

    save() {
      const loading = this.get('loading');
      const isNew = this.get('campaign.isNew');
      loading.show();

      this.get('campaign').save()
        .then((result) => {
          console.info('then', this.get('campaign.id'), result);
          if (isNew) {
            this.get('routing').transitionTo('campaign.email-signup.index');
          }
        })
        .catch((error) => console.info('error', error))
        .finally(() => loading.hide())
      ;
    },
  },
});
