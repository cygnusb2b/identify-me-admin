import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNames: ['form-group'],

  types: null,
  isServiceSelected: false,
  loading: false,
  selected: "",
  deploymentName: null,

  _selected: computed('selected', {
    get() {
      const selected = this.get('selected');
      return (selected) ? selected : "";
    },
    set(key, value) {
      if (value) {
        this.set('selected', value);
        const deployment = this.get('types').findBy('identifier', value);
        this.set('deploymentName', get(deployment, 'name'));
      } else {
        this.set('selected', null);
        this.set('deploymentName', null);
      }
    }
  }),

  typesSort: ['name'],
  typesSorted: computed.sort('types', 'typesSort'),
});
