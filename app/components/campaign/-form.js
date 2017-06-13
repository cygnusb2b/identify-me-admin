import Ember from 'ember';

const { Component, computed, set, get } = Ember;

export default Component.extend({
  classNames: ['card'],

  form: null,

  serviceFieldsLoaded: false,
  serviceFields: null,

  builtInFields: [
    { key: '', label: 'Select field to add...'},
    { key: 'email', label: 'Email Address', fieldType: 'email', required: true },
    { key: 'firstName', label: 'First Name', fieldType: 'text' },
    { key: 'lastName', label: 'Last Name', fieldType: 'text' },
    { key: 'companyName', label: 'Company Name', fieldType: 'text' },
    { key: 'title', label: 'Job Title', fieldType: 'text' },
    { key: 'country', label: 'Country', fieldType: 'select', options: [
      { value: '', label: 'Please select...'},
      { value: 'USA', label: 'United States' },
      { value: 'CAN', label: 'Canada' },
      { value: 'OTHR', label: 'Other' },
    ]},
  ],

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
    deactivate() {
      this.set('form.active', false);
      if (this.get('form.isNew')) {
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
