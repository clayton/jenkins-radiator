class RadiatorRouter extends Backbone.Router
  routes:
    '' : 'index'

  initialize: =>
    global.config = new Config
    @jobs_collection = new JobsCollection

  index: =>
    view = new RadiatorView collection: @jobs_collection
    $('#main-content').html view.render().$el
    @poll()

  poll: =>
    @jobs_collection.fetch()
    _.delay(@poll, 5000)


new RadiatorRouter
