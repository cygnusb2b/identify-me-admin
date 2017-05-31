import Ember            from 'ember';
import JSONAPIAdapter   from 'ember-data/adapters/json-api';
import isEnabled        from 'ember-data/-private/features';

const { inject: { service } } = Ember;

export default JSONAPIAdapter.extend({

  queryService: service('model-query'),

  coalesceFindRequests: true,

  namespace: 'rest',

  pathForType(type) {
    return Ember.Inflector.inflector.singularize(Ember.String.dasherize(type));
  },

  findMany(store, type, ids, snapshots) {
    if (isEnabled('ds-improved-ajax')) {
      throw new Error('Overriding findMany must now be re-evaluted.');
    }

    const url = this.buildURL(type.modelName, ids, snapshots, 'findMany');
    const params = this.get('queryService').buildParams({
      id : { $in: ids }
    }, ids.length);
    return this.ajax(url, 'GET', { data: params });
  },
});
