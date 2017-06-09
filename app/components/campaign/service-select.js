import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['form-group'],

  service: null,
  loading: false,
  services: null,

  selected: computed('service.id', function() {
    const id = this.get('service.id');
    return (id) ? id : "";
  }),

  actions: {
    selectService(id) {
      const model = (id) ? this.get('services').findBy('id', id) : null;
      this.set('service', model);
      this.sendAction('on-service-change', id, model);
    },
  },
});
