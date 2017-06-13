import Ember from 'ember';

const { Component, computed, get, String: { dasherize }, defineProperty } = Ember;

export default Component.extend({

  identifier: null,
  type: null,
  props: null,
  isNew: false,

  embedCode: computed('propsArray.[]', function() {
    return `<div class="id-me" data-component="${this.get('type')}" ${this.get('propsArray').join(' ')}></div>`;
  }),

  init() {
    this._super(...arguments);
    if (!this.get('props')) {
      this.set('props', {});
    }

    const keys = [];
    this.get('props').eachAttribute(key => keys.pushObject(key));
    const toObserve = `props.{${keys.join(',')}}`;

    defineProperty(this, 'propsArray', computed(toObserve, function() {
      const props = this.get('props');
      const formatted = [`data-prop-id="${dasherize(this.get('identifier'))}"`];

      if (!props) {
        return formatted;
      }
      props.eachAttribute(key => {
        const value = get(props, key);
        if (value) {
          const name = `data-prop-${dasherize(key)}`;
          formatted.pushObject(`${name}="${value}"`);
        }
      });
      return formatted;
    }));
  },

});
