var jsdom = require("jsdom").jsdom;
var doc = jsdom();
global.window = doc.parentWindow;

global.$ = require('jquery');
global.window.jQuery = global.$;
global.navigator = window.navigator;

global._ = require('underscore');
global.Backbone = require('backbone');
global.Backbone.$ = $;
