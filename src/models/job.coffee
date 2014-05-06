class global.Job extends Backbone.Model

  defaults:
    color: 'unknown'
    animated: ''

  initialize: =>
    @on 'change:color', @set_health
    @set_health()

    @on 'change:color', @set_animated
    @set_animated()

  set_health: =>
    return @set health: 'passing' if @get('color').match 'blue'
    return @set health: 'failing' if @get('color').match 'red'
    return @set health: 'unstable' if @get('color').match 'yellow'
    return @set health: 'not-built' if @get('color').match 'grey'
    @set health: @get('color')

  set_animated: =>
    return @set animated: 'animated' if @get('color').match 'anime'
    @set animated: ''
