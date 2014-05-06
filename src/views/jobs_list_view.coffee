class global.JobsListView extends Backbone.View
  template: JST['jobs_list']

  initialize: =>
    @views = []
    @listenTo @collection, 'add', @add_one
    @listenTo @collection, 'sync error request reset', @render

  context: =>
    {}

  render: =>
    @$el.html @template @context()
    @remove_views()
    @collection.each @add_one
    this

  remove: =>
    @remove_views()
    super

  # Instance Methods
  add_one: (model) =>
    view = new JobRowView model: model
    @$el.append view.render().$el
    @views.push view

  remove_views: =>
    _.each @views, (view) =>
      view.remove()

    @views = []

