class global.JobsCollection extends Backbone.Collection
  url: "/jenkins-data.json"
  model: Job

  parse: (response) =>
    response['jobs']
