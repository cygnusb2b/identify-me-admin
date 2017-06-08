import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');

  this.route('integration-service', function() {
    this.route('create', { path: '/create/:type' });
    this.route('edit', { path: '/edit/:type/:id' });
  });
  this.route('campaign', function() {
    this.route('email-signup', function() {
      this.route('create');
      this.route('edit', { path: '/edit/:id' });
    });
  });
});

export default Router;
