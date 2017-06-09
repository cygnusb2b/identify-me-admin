import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  index: null,
  target: null,

  actions: {
    change() {
      this.sendAction('on-change', this.get('index'));
    },
    destroy() {
      this.sendAction('on-destroy', this.get('index'));
    },
  },
});
