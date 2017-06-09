import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({

  loading: service(),
  errorProcessor: service(),
  routing: service('-routing'),

  campaign: null,

  validity: {
    details: false,
    targets: false,
  },

  canSave: computed('validity.details', 'validity.targets', function() {
    return this.get('validity.details') && this.get('validity.targets') ? true : false;
  }),

  actions: {
    save() {
      const loading = this.get('loading');
      const isNew = this.get('campaign.isNew');
      loading.show();

      this.get('campaign').save()
        .then(() => {
          if (isNew) {
            this.get('routing').transitionTo('campaign.email-signup.index');
          }
        })
        .catch((json) => this.get('errorProcessor').notify(json.errors || []))
        .finally(() => loading.hide())
      ;
    },
    setDetailValidity(isValid) {
      this.set('validity.details', isValid);
    },
    setTargetValidity(isValid) {
      this.set('validity.targets', isValid);
    },
  },
});
