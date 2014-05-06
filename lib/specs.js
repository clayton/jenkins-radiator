(function() {
  describe('Jobs Collection', function() {
    it('should exist', function() {
      return new JobsCollection;
    });
    return describe('Parsing', function() {
      return it('should parse jobs out of the api response', function() {
        this.sut = new JobsCollection;
        return this.sut.fetch();
      });
    });
  });

}).call(this);

(function() {
  describe('Config', function() {
    return it('should exist', function() {
      return new Config;
    });
  });

}).call(this);

(function() {
  describe('Job', function() {
    describe('Build Status', function() {
      describe('By Default', function() {
        return it('should not be animated', function() {
          this.sut = new Job;
          return expect(this.sut.get('animated')).toEqual('');
        });
      });
      describe('When Building', function() {
        return it('should be animated', function() {
          this.sut = new Job({
            color: 'blue_anime'
          });
          return expect(this.sut.get('animated')).toEqual('animated');
        });
      });
      describe('When Not Building', function() {
        return it('should not be animated', function() {
          this.sut = new Job({
            color: 'blue'
          });
          return expect(this.sut.get('animated')).toEqual('');
        });
      });
      describe('When changing from animated to not', function() {
        return it('should turn off animation', function() {
          this.sut = new Job({
            color: 'blue_anime'
          });
          this.sut.set({
            color: 'blue'
          });
          return expect(this.sut.get('animated')).toEqual('');
        });
      });
      return describe('When a build starts', function() {
        return it('should turn on the animation', function() {
          this.sut = new Job({
            color: 'grey'
          });
          this.sut.set({
            color: 'grey_anime'
          });
          return expect(this.sut.get('animated')).toEqual('animated');
        });
      });
    });
    return describe('Build Health', function() {
      describe('By Default', function() {
        return it('should be unknown', function() {
          this.sut = new Job;
          return expect(this.sut.get('health')).toEqual('unknown');
        });
      });
      describe('When Red', function() {
        return it('should be failing', function() {
          this.sut = new Job({
            color: 'red'
          });
          return expect(this.sut.get('health')).toEqual('failing');
        });
      });
      describe('When Blue', function() {
        return it('should be passing', function() {
          this.sut = new Job({
            color: 'blue'
          });
          return expect(this.sut.get('health')).toEqual('passing');
        });
      });
      describe('When Disabled', function() {
        return it('should be disabled', function() {
          this.sut = new Job({
            color: 'disabled'
          });
          return expect(this.sut.get('health')).toEqual('disabled');
        });
      });
      describe('When Aborted', function() {
        return it('should be aborted', function() {
          this.sut = new Job({
            color: 'aborted'
          });
          return expect(this.sut.get('health')).toEqual('aborted');
        });
      });
      describe('When Yellow', function() {
        return it('should be unstable', function() {
          this.sut = new Job({
            color: 'yellow'
          });
          return expect(this.sut.get('health')).toEqual('unstable');
        });
      });
      describe('When Not Grey', function() {
        return it('should be not built', function() {
          this.sut = new Job({
            color: 'grey'
          });
          return expect(this.sut.get('health')).toEqual('not-built');
        });
      });
      return describe('When Changing', function() {
        return it('should update', function() {
          this.sut = new Job({
            color: 'blue'
          });
          this.sut.set({
            color: 'red'
          });
          return expect(this.sut.get('health')).toEqual('failing');
        });
      });
    });
  });

}).call(this);

(function() {
  describe('Radiator Router', function() {});

}).call(this);

(function() {
  describe('Job Row View', function() {
    return it('should exist', function() {
      return new JobRowView({
        model: new Backbone.Model
      });
    });
  });

}).call(this);

(function() {
  describe('Jobs List View', function() {
    return it('should exist', function() {
      return new JobsListView({
        collection: new Backbone.Collection
      });
    });
  });

}).call(this);

(function() {
  describe('Radiator View', function() {
    return it('should exist', function() {
      return new RadiatorView({
        collection: new Backbone.Collection
      });
    });
  });

}).call(this);
