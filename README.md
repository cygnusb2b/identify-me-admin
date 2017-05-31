# Identify Me! Admin
Ember-based administration interface for user identification-related components.

## Installation
Clone the repository and install the dependencies.
```
npm install && bower install
```

## Development
Once the dependencies are installed, you can run the administration interface by executing:
```
ember serve --proxy=http://localhost:8000
```
You can now access the interface at `http://localhost:4200`.
You'll also need to have the `identify-me-server` library installed and running in order to fullfill backend requests, as this library proxies to `http://localhost:8000`.
