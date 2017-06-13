import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  store: service(),
  demographicLoader: service(),

  serviceFields: null,
  serviceId: null,
  serviceFieldsLoaded: false,
  forms: null,

  activeForms: computed.filterBy('forms', 'active', true),

  hasForms: computed('activeForms.length', function() {
    return this.get('activeForms.length') ? true : false;
  }),

  isValid: computed('hasForms', function() {

    if (!this.get('hasForms')) {
      return false;
    }
    return true;
  }),

  init() {
    this._super(...arguments);
    if (!this.get('forms')) {
      this.set('forms', []);
    }
    this.set('serviceFields', []);
    this.send('checkValidity');
    this.send('loadFields');
  },

  actions: {
    checkValidity() {
      this.sendAction('on-check-validity', this.get('isValid'));
    },

    loadFields() {
      if (!this.get('serviceId')) {
        return;
      }
      this.get('serviceFields').pushObject({ key: '', label: 'Select field to add...'});
      this.get('demographicLoader').retrieve(this.get('serviceId'))
        .then((fields) => {
          fields.forEach((field) => this.get('serviceFields').pushObject(field));
          this.set('serviceFieldsLoaded', true);
        })
      ;
    },
    add() {
      this.get('forms').createFragment({
        name: `Form ${this.get('forms.length') + 1}`,
        fields: [],
      });
      this.send('checkValidity');
    },
    remove(form) {
      this.get('forms').removeObject(form);
      this.send('checkValidity');
    },
  },
});
