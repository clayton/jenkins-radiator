var jsdom = require("jsdom").jsdom;
var doc = jsdom();
global.window = doc.parentWindow;

global.$ = require('jquery');
global.window.jQuery = global.$;
global.navigator = window.navigator;

global._ = require('underscore');
global.Backbone = require('backbone');
global.Backbone.$ = $;

(function() {
  this.JST || (this.JST = {});
  this.JST["job_row"] = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<div class="col-md-12">\n  <div class="job ');
    
      __out.push(__sanitize(this.model.animated));
    
      __out.push(' ');
    
      __out.push(__sanitize(this.model.health));
    
      __out.push('">\n    <h2>');
    
      __out.push(__sanitize(this.model.name));
    
      __out.push('</h2>\n  </div>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
}).call(global || this);
(function() {
  this.JST || (this.JST = {});
  this.JST["jobs_list"] = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
    
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
}).call(global || this);
(function() {
  this.JST || (this.JST = {});
  this.JST["radiator"] = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<div class="row">\n  <div class="col-md-12"><h1>Jenkins Radiator</h1></div>\n</div>\n<div id="jobs-list"></div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
}).call(global || this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  global.Config = (function(_super) {
    __extends(Config, _super);

    function Config() {
      return Config.__super__.constructor.apply(this, arguments);
    }

    Config.prototype.defaults = {
      jenkins_url: 'jenkins-data.json',
      polling_interval: 60000
    };

    return Config;

  })(Backbone.Model);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  global.Job = (function(_super) {
    __extends(Job, _super);

    function Job() {
      this.set_animated = __bind(this.set_animated, this);
      this.set_health = __bind(this.set_health, this);
      this.initialize = __bind(this.initialize, this);
      return Job.__super__.constructor.apply(this, arguments);
    }

    Job.prototype.defaults = {
      color: 'unknown',
      animated: ''
    };

    Job.prototype.initialize = function() {
      this.on('change:color', this.set_health);
      this.set_health();
      this.on('change:color', this.set_animated);
      return this.set_animated();
    };

    Job.prototype.set_health = function() {
      if (this.get('color').match('blue')) {
        return this.set({
          health: 'passing'
        });
      }
      if (this.get('color').match('red')) {
        return this.set({
          health: 'failing'
        });
      }
      if (this.get('color').match('yellow')) {
        return this.set({
          health: 'unstable'
        });
      }
      if (this.get('color').match('grey')) {
        return this.set({
          health: 'not-built'
        });
      }
      return this.set({
        health: this.get('color')
      });
    };

    Job.prototype.set_animated = function() {
      if (this.get('color').match('anime')) {
        return this.set({
          animated: 'animated'
        });
      }
      return this.set({
        animated: ''
      });
    };

    return Job;

  })(Backbone.Model);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  global.JobsCollection = (function(_super) {
    __extends(JobsCollection, _super);

    function JobsCollection() {
      this.parse = __bind(this.parse, this);
      return JobsCollection.__super__.constructor.apply(this, arguments);
    }

    JobsCollection.prototype.url = "/jenkins-data.json";

    JobsCollection.prototype.model = Job;

    JobsCollection.prototype.parse = function(response) {
      return response['jobs'];
    };

    return JobsCollection;

  })(Backbone.Collection);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  global.JobRowView = (function(_super) {
    __extends(JobRowView, _super);

    function JobRowView() {
      this.render = __bind(this.render, this);
      this.context = __bind(this.context, this);
      this.initialize = __bind(this.initialize, this);
      return JobRowView.__super__.constructor.apply(this, arguments);
    }

    JobRowView.prototype.template = JST['job_row'];

    JobRowView.prototype.className = 'row';

    JobRowView.prototype.initialize = function() {
      this.listenTo(this.model, 'remove', this.remove);
      return this.listenTo(this.model, 'change', this.render);
    };

    JobRowView.prototype.context = function() {
      return {
        model: this.model.toJSON()
      };
    };

    JobRowView.prototype.render = function() {
      this.$el.html(this.template(this.context()));
      return this;
    };

    return JobRowView;

  })(Backbone.View);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  global.JobsListView = (function(_super) {
    __extends(JobsListView, _super);

    function JobsListView() {
      this.remove_views = __bind(this.remove_views, this);
      this.add_one = __bind(this.add_one, this);
      this.remove = __bind(this.remove, this);
      this.render = __bind(this.render, this);
      this.context = __bind(this.context, this);
      this.initialize = __bind(this.initialize, this);
      return JobsListView.__super__.constructor.apply(this, arguments);
    }

    JobsListView.prototype.template = JST['jobs_list'];

    JobsListView.prototype.initialize = function() {
      this.views = [];
      this.listenTo(this.collection, 'add', this.add_one);
      return this.listenTo(this.collection, 'sync error request reset', this.render);
    };

    JobsListView.prototype.context = function() {
      return {};
    };

    JobsListView.prototype.render = function() {
      this.$el.html(this.template(this.context()));
      this.remove_views();
      this.collection.each(this.add_one);
      return this;
    };

    JobsListView.prototype.remove = function() {
      this.remove_views();
      return JobsListView.__super__.remove.apply(this, arguments);
    };

    JobsListView.prototype.add_one = function(model) {
      var view;
      view = new JobRowView({
        model: model
      });
      this.$el.append(view.render().$el);
      return this.views.push(view);
    };

    JobsListView.prototype.remove_views = function() {
      _.each(this.views, (function(_this) {
        return function(view) {
          return view.remove();
        };
      })(this));
      return this.views = [];
    };

    return JobsListView;

  })(Backbone.View);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  global.RadiatorView = (function(_super) {
    __extends(RadiatorView, _super);

    function RadiatorView() {
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      return RadiatorView.__super__.constructor.apply(this, arguments);
    }

    RadiatorView.prototype.template = JST['radiator'];

    RadiatorView.prototype.initialize = function() {
      return this.listenTo(this.collection, 'sync', this.render);
    };

    RadiatorView.prototype.render = function() {
      var list;
      list = new JobsListView({
        collection: this.collection
      });
      this.$el.html(this.template);
      $("#jobs-list").html(list.render().el);
      return this;
    };

    return RadiatorView;

  })(Backbone.View);

}).call(this);

(function() {
  var RadiatorRouter,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RadiatorRouter = (function(_super) {
    __extends(RadiatorRouter, _super);

    function RadiatorRouter() {
      this.poll = __bind(this.poll, this);
      this.index = __bind(this.index, this);
      this.initialize = __bind(this.initialize, this);
      return RadiatorRouter.__super__.constructor.apply(this, arguments);
    }

    RadiatorRouter.prototype.routes = {
      '': 'index'
    };

    RadiatorRouter.prototype.initialize = function() {
      global.config = new Config;
      return this.jobs_collection = new JobsCollection;
    };

    RadiatorRouter.prototype.index = function() {
      var view;
      view = new RadiatorView({
        collection: this.jobs_collection
      });
      $('#main-content').html(view.render().$el);
      return this.poll();
    };

    RadiatorRouter.prototype.poll = function() {
      this.jobs_collection.fetch();
      return _.delay(this.poll, 5000);
    };

    return RadiatorRouter;

  })(Backbone.Router);

  new RadiatorRouter;

}).call(this);

(function() {
  describe('Jobs Collection', function() {
    it('should exist', function() {
      return new JobsCollection;
    });
    return describe('Parsing', function() {
      return it('should parse jobs out of the api response', function() {
        this.sut = new JobsCollection;
        return this.sut.fetch();
      });
    });
  });

}).call(this);

(function() {
  describe('Config', function() {
    return it('should exist', function() {
      return new Config;
    });
  });

}).call(this);

(function() {
  describe('Job', function() {
    describe('Build Status', function() {
      describe('By Default', function() {
        return it('should not be animated', function() {
          this.sut = new Job;
          return expect(this.sut.get('animated')).toEqual('');
        });
      });
      describe('When Building', function() {
        return it('should be animated', function() {
          this.sut = new Job({
            color: 'blue_anime'
          });
          return expect(this.sut.get('animated')).toEqual('animated');
        });
      });
      describe('When Not Building', function() {
        return it('should not be animated', function() {
          this.sut = new Job({
            color: 'blue'
          });
          return expect(this.sut.get('animated')).toEqual('');
        });
      });
      describe('When changing from animated to not', function() {
        return it('should turn off animation', function() {
          this.sut = new Job({
            color: 'blue_anime'
          });
          this.sut.set({
            color: 'blue'
          });
          return expect(this.sut.get('animated')).toEqual('');
        });
      });
      return describe('When a build starts', function() {
        return it('should turn on the animation', function() {
          this.sut = new Job({
            color: 'grey'
          });
          this.sut.set({
            color: 'grey_anime'
          });
          return expect(this.sut.get('animated')).toEqual('animated');
        });
      });
    });
    return describe('Build Health', function() {
      describe('By Default', function() {
        return it('should be unknown', function() {
          this.sut = new Job;
          return expect(this.sut.get('health')).toEqual('unknown');
        });
      });
      describe('When Red', function() {
        return it('should be failing', function() {
          this.sut = new Job({
            color: 'red'
          });
          return expect(this.sut.get('health')).toEqual('failing');
        });
      });
      describe('When Blue', function() {
        return it('should be passing', function() {
          this.sut = new Job({
            color: 'blue'
          });
          return expect(this.sut.get('health')).toEqual('passing');
        });
      });
      describe('When Disabled', function() {
        return it('should be disabled', function() {
          this.sut = new Job({
            color: 'disabled'
          });
          return expect(this.sut.get('health')).toEqual('disabled');
        });
      });
      describe('When Aborted', function() {
        return it('should be aborted', function() {
          this.sut = new Job({
            color: 'aborted'
          });
          return expect(this.sut.get('health')).toEqual('aborted');
        });
      });
      describe('When Yellow', function() {
        return it('should be unstable', function() {
          this.sut = new Job({
            color: 'yellow'
          });
          return expect(this.sut.get('health')).toEqual('unstable');
        });
      });
      describe('When Not Grey', function() {
        return it('should be not built', function() {
          this.sut = new Job({
            color: 'grey'
          });
          return expect(this.sut.get('health')).toEqual('not-built');
        });
      });
      return describe('When Changing', function() {
        return it('should update', function() {
          this.sut = new Job({
            color: 'blue'
          });
          this.sut.set({
            color: 'red'
          });
          return expect(this.sut.get('health')).toEqual('failing');
        });
      });
    });
  });

}).call(this);

(function() {
  describe('Radiator Router', function() {});

}).call(this);

(function() {
  describe('Job Row View', function() {
    return it('should exist', function() {
      return new JobRowView({
        model: new Backbone.Model
      });
    });
  });

}).call(this);

(function() {
  describe('Jobs List View', function() {
    return it('should exist', function() {
      return new JobsListView({
        collection: new Backbone.Collection
      });
    });
  });

}).call(this);

(function() {
  describe('Radiator View', function() {
    return it('should exist', function() {
      return new RadiatorView({
        collection: new Backbone.Collection
      });
    });
  });

}).call(this);
