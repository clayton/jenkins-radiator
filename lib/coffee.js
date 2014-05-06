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
