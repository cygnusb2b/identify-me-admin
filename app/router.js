import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
   this.route('login');

  this.route('integration-service', function() {
    this.route('edit', { path: '/edit/:id' });
    this.route('create');
  });
});

export default Router;
