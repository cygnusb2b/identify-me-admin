import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  canSet: false,
  index: null,
  cookie: null,

  actions: {
    change() {
      this.sendAction('on-change', this.get('index'));
    },
    destroy() {
      this.sendAction('on-destroy', this.get('index'));
    },
  },
});
