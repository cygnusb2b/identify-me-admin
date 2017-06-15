import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  store: service(),
  demographicLoader: service(),
  fieldLoader: service(),

  serviceId: null,
  forms: null,

  fields: {
    builtIn: null,
    service: null,
  },

  loaded: {
    builtIn: false,
    service: false,
  },

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
    this.set('fields.builtIn', []);
    this.set('fields.service', []);
    this.send('checkValidity');
    this.send('loadFields');
  },

  loadFields(type, fields) {
    fields.forEach(field => this.pushField(type, field));
    this.set(`loaded.${type}`, true)
  },

  pushField(type, field) {
    const key = `fields.${type}`;
    this.get(key).pushObject(field);
  },

  actions: {
    checkValidity() {
      this.sendAction('on-check-validity', this.get('isValid'));
    },

    loadFields() {
      const placeholder = { key: '', label: 'Select field to add...'};

      this.pushField('builtIn', placeholder);
      this.get('fieldLoader').retrieve()
        .then((fields) => this.loadFields('builtIn', fields))
      ;

      if (!this.get('serviceId')) {
        return;
      }
      this.pushField('service', placeholder)
      this.get('demographicLoader').retrieve(this.get('serviceId'))
        .then((fields) => this.loadFields('service', fields))
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
