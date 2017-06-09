import Ember from 'ember';

const { Component, computed, get, observer, run } = Ember;

export default Component.extend({
  targets: null,

  isValid: computed('hasTargets', 'targets.@each.host', 'targets.@each.selector', function() {
    if (!this.get('hasTargets')) {
      return true;
    }
    const invalid = this.get('targets').reject((target) => {
      return get(target, 'host') && get(target, 'selector') ? true : false;
    });
    return invalid.length ? false : true;
  }),

  hasTargets: computed('targets.length', function() {
    return this.get('targets.length') ? true : false;
  }),

  init() {
    this._super(...arguments);
    this.send('checkValidity');
  },

  actions: {
    checkValidity() {
      this.sendAction('on-check-validity', this.get('isValid'));
    },
    add() {
      this.get('targets').pushObject({});
      this.send('checkValidity');
    },
    remove(index) {
      this.get('targets').removeAt(index);
      this.send('checkValidity');
    },
  },
});
