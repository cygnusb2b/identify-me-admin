import Ember from 'ember';

const { Component, computed, set, get } = Ember;

export default Component.extend({

  classNames: ['card'],

  form: null,

  serviceFields: null,
  builtInFields: null,

  serviceFieldsLoaded: false,
  builtInFieldsLoaded: false,

  controlValue: '',

  selected: computed('form.fields.[]', function() {
    return this.get('form.fields');
  }),

  selectedKeys: computed.mapBy('selected', 'key'),

  builtInSelectable: computed('builtInFields.[]', 'selectedKeys.[]', function() {
    return this.get('builtInFields').reject((field) => this.get('selectedKeys').includes(field.key));
  }),
  serviceSelectable: computed('serviceFields.[]', 'selectedKeys.[]', function() {
    return this.get('serviceFields').reject((field) => this.get('selectedKeys').includes(field.key));
  }),

  addField(key, type) {
    this.set('controlValue', '');
    const field = this.get(type).findBy('key', key);
    if (key && field) {
      this.get('form.fields').createFragment(field);
    }
    this.send('change');
  },

  actions: {
    change() {
      this.sendAction('on-change', this.get('form'));
    },
    addBuiltInField(key) {
      this.addField(key, 'builtInFields');
    },
    addServiceField(key) {
      this.addField(key, 'serviceFields');
    },
    toggleActive() {
      this.set('form.active', !this.get('form.active'));
      if (this.get('form.isNew') && !this.get('form.active')) {
        this.sendAction('on-destroy', this.get('form'));
      }
      this.send('change');
    },
    removeField(index) {
      this.set('controlValue', '');
      this.get('form.fields').removeAt(index);
      this.send('change');
    },
    toggleRequired(index) {
      const field = this.get('form.fields').objectAt(index);
      set(field, 'required', !get(field, 'required'));
      this.send('change');
    },
  },

});
