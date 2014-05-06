var global;

if (typeof global === "undefined" || global === null) {
  global = window;
}

Backbone.history.loadUrl = function(fragment) {
  var matchFound;
  fragment = this.fragment = this.getFragment(fragment);
  matchFound = false;
  _.each(this.handlers, (function(_this) {
    return function(handler) {
      if (handler.route.test(fragment)) {
        handler.callback(fragment);
        return matchFound = true;
      }
    };
  })(this));
  return matchFound;
};
