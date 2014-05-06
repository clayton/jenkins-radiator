describe 'Jobs Collection', ->
  it 'should exist', ->
    new JobsCollection
  describe 'Parsing', ->
    it 'should parse jobs out of the api response', ->
      @sut = new JobsCollection
      @sut.fetch()
