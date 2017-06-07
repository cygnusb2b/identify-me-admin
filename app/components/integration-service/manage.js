import Ember from 'ember';
import promisify from 'admin/utils/wrap-ajax';

const { Component, computed, inject: { service }, $ } = Ember;

export default Component.extend({
  test: {
    isRunning: false,
    isComplete: false,
  },

  model: null,
  loading: service(),
  routing: service('-routing'),
  errorProcessor: service(),
  notify: service(),

  serviceTestMap: [
    { type: 'omeda', attrs: ['clientKey', 'brandKey', 'appId', 'inputId'] },
  ],

  testAttrs: computed('serviceType', function() {
    const serviceMap = this.get('serviceTestMap').findBy('type', this.get('serviceType'));
    return serviceMap.attrs;
  }),

  canTest: computed.not('test.isRunning'),

  serviceType: computed('model.constructor.modelName', function() {
    if (this.get('model')) {
      return this.get('model.constructor.modelName').replace('integration-service-', '');
    }
    return null;
  }),

  formName: computed('serviceType', function() {
    const type = this.get('serviceType');
    if (type) {
      return `components/integration-service/form-${type}`;
    }
    return false;
  }),

  _getTestValues() {
    const values = {};
    this.get('testAttrs').forEach((key) => values[key] = this.get(`model.${key}`));
    return values;
  },

  actions: {
    confirmClose() {
      if (this.get('model.hasDirtyAttributes')) {
        if (window.confirm('Are you sure you want to discard these changes?')) {
          this.get('model').rollbackAttributes();
          this.send('transitionToIndex');
        }
      }
    },
    saveService() {
      const loading = this.get('loading');
      loading.show();
      this.get('model').save()
        .then(() => this.send('transitionToIndex'))
        .finally(() => loading.hide())
      ;
    },
    dismissTestMessage() {
      this.set('test.successful', false);
    },
    testService() {
      this.set('test.isRunning', true);
      this.set('test.isComplete', false);
      const type = this.get('serviceType');
      const data = this._getTestValues();
      promisify($.ajax(`/service/test/${type}`, {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ data }),
      }))
      .then(() => this.get('notify').success('The API successfully connected!'))
      .catch((json) => this.get('errorProcessor').notify(json.errors || []))
      .finally(() => {
        this.set('test.isRunning', false);
        this.set('test.isComplete', true);
      });
    },
    transitionToIndex() {
      this.get('routing').transitionTo('integration-service.index');
    },
  },
});
