var JenkinsRadiator = {
    init:function () {
        JenkinsRadiator.router = new JenkinsRadiator.Router();
        Backbone.history.start({pushState:true});
        JenkinsRadiator.router.navigate("", {trigger:true});
    }
};