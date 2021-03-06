import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({

  loading: service(),
  errorProcessor: service(),
  routing: service('-routing'),

  routeName: null,
  campaign: null,

  validity: {
    details: false,
    targets: false,
    hooks: false,
    forms: false,
  },

  detailsComponent: computed('campaign.typeKey', function() {
    return `campaign/${this.get('campaign.typeKey')}/details`;
    // console.info('detailsComponent', this.get('campaign.typeKey'));
  }),

  canSave: computed('validity.details', 'validity.targets', 'validity.hooks', 'validity.forms', function() {
    return this.get('validity.details')
      && this.get('validity.targets')
      && this.get('validity.hooks')
      && this.get('validity.forms') ? true : false
    ;
  }),

  actions: {
    save() {
      const loading = this.get('loading');
      const isNew = this.get('campaign.isNew');
      const routeName = this.get('routeName');
      loading.show();

      this.get('campaign').save()
        .then(() => {
          if (isNew && routeName) {
            this.get('routing').transitionTo(routeName);
          }
          // Workaround until embed-ones are fixed on the backend.
          this.get('campaign').reload().finally(() => loading.hide());
        })
        .catch((json) => {
          this.get('errorProcessor').notify(json.errors || []);
          loading.hide();
        })
      ;
    },
    setDetailValidity(isValid) {
      this.set('validity.details', isValid);
    },
    setTargetValidity(isValid) {
      this.set('validity.targets', isValid);
    },
    setHookValidity(isValid) {
      this.set('validity.hooks', isValid);
    },
    setFormValidity(isValid) {
      this.set('validity.forms', isValid);
    },
  },
});
