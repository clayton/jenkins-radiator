JenkinsRadiator.Job = Backbone.Model.extend({
});

JenkinsRadiator.JobsCollection = Backbone.Collection.extend({
  model: JenkinsRadiator.Job,
  sync: function(method, model, options) {
      var params = _.extend({
          type: 'GET',
          dataType: 'jsonp',
          processData: true,
          url: config.ci_json_url + "?jsonp=?"
      }, options);
      return $.ajax(params);
  },
  parse: function(response) {
      this.filteredJobsCount = _.filter(response.jobs, function(job){
          return _.include(config.filtered, job.name);
      }).length;
      console.log(this.filteredJobsCount);
      return response.jobs;
  },
  failingBuilds:function(){
      var builds = this.filter(function(job){
         return job.get("color") == "red" || job.get("color") == "red_anime";
      });
      return builds;
  },
  passingCount:function(){
      var builds = this.filter(function(job){
         return job.get("color") == "blue" || job.get("color") == "blue_anime";
      });
      return builds.length;
  },
  failingCount:function(){
      var builds = this.filter(function(job){
         return job.get("color") == "red" || job.get("color") == "red_anime";
      });
      return builds.length;
  },
  buildingCount:function(){
      var builds = this.filter(function(job){
         return job.get("color") == "red_anime" || job.get("color") == "blue_anime";
      });
      return builds.length;
  },
  disabledCount:function(){
      var builds = this.filter(function(job){
         return job.get("color") == "grey";
      });
      return builds.length;
  },
  buildsAreFailing:function(){
      if (this.failingCount() > 0) {
          return true;
      }else{
          return false;
      };
  }


});

JenkinsRadiator.JobView = Backbone.View.extend({
  className:"job-view",

  events: {
    // 'click button#add': 'callback'
  },

  initialize: function(){
    _.bindAll(this, 'render');
  },

  render: function(){
      var template = $("#jobViewTemplate").html();
      $(this.el).append(Mustache.to_html(template, this.model.toJSON()));
      $(this.el).addClass(this.model.get("color"));
      return this;
  }
});

JenkinsRadiator.RadiatorView = Backbone.View.extend({
    initialize: function(){
        _.bindAll(this, 'render');
        this.jobList = this.options.collection;
        this.jobList.bind("change", this.render);
        this.lastSoundPlayed = "";
    },

    render: function(){
        this.renderHealth();
        this.renderMetrics();
        this.renderAudio();
    },
    renderAudio: function(){
        if (this.jobList.buildsAreFailing() && this.lastSoundPlayed != "boo") {
            this.lastSoundPlayed = "boo";
            $("audio#booing-audio")[0].play();
        }
        if (!this.jobList.buildsAreFailing() && this.lastSoundPlayed != "cheer"){
            this.lastSoundPlayed = "cheer";
            $("audio#cheering-audio")[0].play();
        }
    },
    renderMetrics: function(){
        var passingBuildsView  = new JenkinsRadiator.BuildMetricView({"title":"Passing", "count":this.jobList.passingCount()});
        var failingBuildsView  = new JenkinsRadiator.BuildMetricView({"title":"Failing", "count":this.jobList.failingCount()});
        var buildingBuildsView = new JenkinsRadiator.BuildMetricView({"title":"Building", "count":this.jobList.buildingCount()});
        var disabledBuildsView = new JenkinsRadiator.BuildMetricView({"title":"Disabled", "count":this.jobList.disabledCount()});

        $(".build-metrics-wrapper .build-metric.passing-count").html(passingBuildsView.render().el);
        $(".build-metrics-wrapper .build-metric.failing-count").html(failingBuildsView.render().el);
        $(".build-metrics-wrapper .build-metric.building-count").html(buildingBuildsView.render().el);
        $(".build-metrics-wrapper .build-metric.disabled-count").html(disabledBuildsView.render().el);
    },
    renderHealth: function(){
        $('.build-health-wrapper .build-health').removeClass("passing");
        $('.build-health-wrapper .build-health').removeClass("failing");
        if (this.jobList.buildsAreFailing()) {
            $(".build-health").html("");
            $('.build-health-wrapper .build-health').addClass("failing");
            _.each(this.jobList.failingBuilds(), function(job){
                $(".build-health").append(new JenkinsRadiator.JobView({model:job}).render().el);
            });
        }else{
            $('.build-health-wrapper .build-health').addClass("passing");
            $('.build-health-wrapper .build-health').html('<div class="icon"></div>');
            this.addPassingIcon();
        };
    },
    addPassingIcon: function(){
        if(this.jobList.filteredJobsCount > 0){
            $('.build-health-wrapper .build-health .icon').html('<span>Jobs We Ignore: ' + this.jobList.filteredJobsCount + '</span>');
        }else{
            $('.build-health-wrapper .build-health .icon').html('<i class="icon-heart icon-white"></i>');
        }
    }
});

JenkinsRadiator.BuildMetricView = Backbone.View.extend({
    initialize: function(){
        _.bindAll(this, 'render');
    },

    render: function(){
        var template = $("#buildMetricTemplate").html();
        $(this.el).append(Mustache.to_html(template, this.options));
        return this;
    }
});

JenkinsRadiator.Router = Backbone.Router.extend({
    routes: {
        "":"home"
    },

    home:function(){
        var jobList = new JenkinsRadiator.JobsCollection();
        var radiatorView = new JenkinsRadiator.RadiatorView({"collection":jobList});
        jobList.fetch({success: function(){
            radiatorView.render();
        }});
        var fetchAndDisplay = function(){
            setTimeout(function(){
                jobList.fetch({success: function(){
                    radiatorView.render();
                }});
                fetchAndDisplay();
            }, config.refresh_interval);
        }
        fetchAndDisplay();
    }
})