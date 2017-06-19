import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  cookies: null,
  setCookies: null,

  isValid: computed('hasCookies', 'cookies.@each.name', function() {
    if (!this.get('hasCookies')) {
      return true;
    }
    const invalid = this.get('cookies').reject((target) => {
      return get(target, 'name') ? true : false;
    });
    return invalid.length ? false : true;
  }),

  hasCookies: computed('cookies.length', function() {
    return this.get('cookies.length') ? true : false;
  }),

  init() {
    this._super(...arguments);
    this.send('checkValidity');
  },

  actions: {
    checkValidity() {
      this.sendAction('on-check-validity', this.get('isValid'));
    },
    addCookie() {
      this.get('cookies').pushObject({});
      this.send('checkValidity');
    },
    removeCookie(index) {
      this.get('cookies').removeAt(index);
      this.send('checkValidity');
    },
    addSetCookie() {
      this.get('setCookies').pushObject({});
      this.send('checkValidity');
    },
    removeSetCookie(index) {
      this.get('setCookies').removeAt(index);
      this.send('checkValidity');
    },
  },
});
