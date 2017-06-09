import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  campaignId: null,
  isNew: false,

  embedCode: computed('campaignId', function() {
    return `<div class="id-me" data-component="EmailSignup" data-prop-id="${this.get('campaignId')}"></div>`;
  }),
});
