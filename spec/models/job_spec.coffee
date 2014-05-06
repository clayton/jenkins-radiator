describe 'Job', ->

  describe 'Build Status', ->
    describe 'By Default', ->
      it 'should not be animated', ->
        @sut = new Job
        expect(@sut.get('animated')).toEqual ''

    describe 'When Building', ->
      it 'should be animated', ->
        @sut = new Job color: 'blue_anime'
        expect(@sut.get('animated')).toEqual 'animated'

    describe 'When Not Building', ->
      it 'should not be animated', ->
        @sut = new Job color: 'blue'
        expect(@sut.get('animated')).toEqual ''

    describe 'When changing from animated to not', ->
      it 'should turn off animation', ->
        @sut = new Job color: 'blue_anime'
        @sut.set color: 'blue'
        expect(@sut.get('animated')).toEqual ''

    describe 'When a build starts', ->
      it 'should turn on the animation', ->
        @sut = new Job color: 'grey'
        @sut.set color: 'grey_anime'
        expect(@sut.get('animated')).toEqual 'animated'



  describe 'Build Health', ->

    describe 'By Default', ->
      it 'should be unknown', ->
        @sut = new Job
        expect(@sut.get('health')).toEqual 'unknown'

    describe 'When Red', ->
      it 'should be failing', ->
        @sut = new Job color: 'red'
        expect(@sut.get('health')).toEqual 'failing'

    describe 'When Blue', ->
      it 'should be passing', ->
        @sut = new Job color: 'blue'
        expect(@sut.get('health')).toEqual 'passing'

    describe 'When Disabled', ->
      it 'should be disabled', ->
        @sut = new Job color: 'disabled'
        expect(@sut.get('health')).toEqual 'disabled'

    describe 'When Aborted', ->
      it 'should be aborted', ->
        @sut = new Job color: 'aborted'
        expect(@sut.get('health')).toEqual 'aborted'

    describe 'When Yellow', ->
      it 'should be unstable', ->
        @sut = new Job color: 'yellow'
        expect(@sut.get('health')).toEqual 'unstable'

    describe 'When Not Grey', ->
      it 'should be not built', ->
        @sut = new Job color: 'grey'
        expect(@sut.get('health')).toEqual 'not-built'

    describe 'When Changing', ->
      it 'should update', ->
        @sut = new Job color: 'blue'
        @sut.set color: 'red'
        expect(@sut.get('health')).toEqual 'failing'
