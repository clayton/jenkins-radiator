unless global?
  global = window

Backbone.history.loadUrl = (fragment) ->
  fragment = this.fragment = this.getFragment(fragment);
  matchFound = false;

  _.each this.handlers, (handler) =>
    if  handler.route.test fragment
      handler.callback fragment
      matchFound = true

  return matchFound;
