class global.RadiatorView extends Backbone.View
  template: JST['radiator']

  initialize: =>
    @listenTo @collection, 'sync', @render

  render: =>
    list = new JobsListView collection: @collection
    @$el.html @template
    $("#jobs-list").html list.render().el
    this
