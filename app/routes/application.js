import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  loading: service(),

  actions: {
    linkTo(name) {
      this.transitionTo(name);
    },
    softDelete(model, routeName) {
      const loading = this.get('loading');

      // @todo Should use a more elegant confirmation.
      if (window.confirm('Are you sure you want to delete this item?')) {
        loading.show();
        model.set('deleted', true);
        model.save()
          .then(() => this.transitionTo(routeName))
          .catch(adapterError => this.get('errorProcessor').notify(adapterError.errors))
          .finally(() => loading.hide())
        ;
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
});
