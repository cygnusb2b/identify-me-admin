import Ember from 'ember';

const { Component, computed, get, String: { dasherize } } = Ember;

export default Component.extend({
  campaign: null,

  isNew: computed('campaign.isNew', function() {
    return this.get('campaign.isNew');
  }),

  props: computed('campaign.id', 'campaign.callToAction', 'campaign.description', 'campaign.buttonValue', 'campaign.previewUrl', function() {
    const keys = ['id', 'callToAction', 'description', 'buttonValue', 'previewUrl'];
    const props = [];
    const campaign = this.get('campaign');
    keys.forEach(key => {
      const value = get(campaign, key);
      if (value) {
        const name = `data-prop-${dasherize(key)}`;
        props.pushObject(`${name}="${value}"`);
      }
    });
    return props;
  }),

  embedCode: computed('props.[]', function() {
    return `<div class="id-me" data-component="EmailSignupCampaign" ${this.get('props').join(' ')}></div>`;
  }),
});
