'use strict';

var expect = chai.expect;


describe('global', function(){

  before(function(){

  });

  after(function(){

  });
  describe('convertToAudioStream', function(){
    it('should be a function', function(){
      expect(convertToAudioStream).to.be.a('function');
    });

    it('should catch exception', function(){
      assert.throw(convertToAudioStream,/MediaStream/);
    });

    it('should return mediaStream object', function(){
      var mediaStream = {
        getVideoTracks: function(){
          return false;
        }
      };
      var res = convertToAudioStream(mediaStream);
      expect(res).to.equal(mediaStream);
    });

    it('should return a stream', function(){
      var mediaStream = {
        data :'test'
      };
      // var res = convertToAudioStream(mediaStream);
      // expect(res).to.equal(mediaStream);
    });
  });

  describe('getRandomString', function(){
    it('should be a function', function(){
      expect(getRandomString).to.be.a('function');
    });

    it('should return something', function(){
      var randomString = getRandomString();
      expect(randomString).to.be.a('string');
    });
  });

  describe('isData', function(){
    it('should be a function', function(){
      expect(typeof isData).to.equal('function');
    });

    it('should return true', function(){
      var session = {
        data: 'test'
      }
      var res = isData(session);
      expect(res).to.equal('test');
    });

    it('should return false', function(){
      var session = {
      }
      var res = isData(session);
      expect(res).to.be.a('undefined');
    });
  });

  describe('isNull', function(){
    it('should be a function', function(){
      expect(isNull).to.be.a('function');
    });

    it('should return true', function(){
      var session;
      var res = isNull(session);
      expect(res).to.equal(true);
    });

    it('should return false', function(){
      var session = {};
      var res = isNull(session);
      expect(res).to.equal(false);
    });
  });

  describe('isString', function(){
    it('should be a function', function(){
      expect(isString).to.be.a('function');
    });

    it('should return true', function(){
      var session = 'string';
      var res = isString(session);
      expect(res).to.equal(true);
    });

    it('should return false', function(){
      var session = {};
      var res = isString(session);
      expect(res).to.equal(false);
    });
  });

  describe('isEmpty', function(){
    it('should be a function', function(){
      expect(isEmpty).to.be.a('function');
    });

    it('should return true', function(){
      var session = {};
      var res = isEmpty(session);
      expect(res).to.equal(true);
    });

    it('should return true', function(){
      var session = new Object;
      var res = isEmpty(session);
      expect(res).to.equal(true);
    });

    it('should return false', function(){
      var session = '';
      var res = isEmpty(session);
      expect(res).to.equal(false);
    });
  });

  describe('ab2str', function(){
    it('should be a function', function(){
      expect(ab2str).to.be.a('function');
    });

    it('should equal string', function(){
      var buf = [65, 66, 67];
      var res = ab2str(buf);
      expect(res).to.equal('ABC');
    });
  });

  describe('str2ab', function(){
    it('should be a function', function(){
      expect(str2ab).to.be.a('function');
    });

    it('should equal array', function(){
      var str = 'ABC';
      var res = str2ab(str);
      expect(JSON.stringify(res)).to.equal(JSON.stringify([65, 66, 67]));
    });
  });

  describe('swap', function(){
    it('should be a function', function(){
      expect(swap).to.be.a('function');
    });

    it('should equal array', function(){
      var arr = [1,2];
      var res = swap(arr);
      expect(JSON.stringify(res)).to.equal(JSON.stringify([1,2]));
    });
  });

  describe('forEach', function(){
    it('should be a function', function(){
      expect(forEach).to.be.a('function');
    });

    it('should check callback', function(){
      var result = '';
      var obj = {
        el1 : 5,
        el2 : 2
      };
      var callback = function(item,name){
        result += name;
      }
      var res = forEach(obj,callback);
      expect(result).to.equal('el1el2');
    });
  });

  describe('toStr', function(){
    it('should be a function', function(){
      expect(toStr).to.be.a('function');
    });

    it('should return string', function(){
      var res = toStr({a:'1',b:'2'});
      expect(res).to.equal('{\n\t"a": "1",\n\t"b": "2"\n}');
    });
  });

  describe('getLength', function(){
    it('should be a function', function(){
      expect(getLength).to.be.a('function');
    });

    it('should return exception', function(){
      assert.throw(getLength,/Invalid/);
    });

    it('should return 0', function(){
      expect(getLength({})).to.equal(0);
    });

    it('should return obj length', function(){
      expect(getLength({a:'2'})).to.equal(1);
    });
  });

  describe('createMediaElement', function(){
    it('should be a function', function(){
      expect(createMediaElement).to.be.a('function');
    });

    it('should return exception stream', function(){
      assert.throw(createMediaElement,/stream/);
    });

    it('should return exception', function(){
      var createMedia = function() {
        return createMediaElement({});
      }
      assert.throw(createMedia,/session/);
    });

    it('should create element', function(){
      var blob = new Blob([new Uint8Array(8)], {type:"image/png"});
      createMediaElement(blob,{});
    });

    it('should emulate firefox', function(){
      isFirefox = true;
      var blob = new Blob([new Uint8Array(8)], {type:"image/png"});
      createMediaElement(blob,{});
    });

    // it('should emulate plugin RTC', function(){
    //   isPluginRTC = true;
    //   var blob = new Blob([new Uint8Array(8)], {type:"image/png"});
    //   // createMediaElement(blob,{streamid:'media'});
    // });
  });

  describe('onStreamEndedHandler', function(){
    it('should be a function', function(){
      expect(onStreamEndedHandler).to.be.a('function');
    });

    it('should return nothing', function(){
      var streamedObject = {
        mediaElement : {
          parentNode:''
        },
      };
      var res = onStreamEndedHandler(streamedObject);
      expect(res).to.be.an('undefined');
    });

    it('should return connection callback', function(){
      var streamedObject = {
        mediaElement : {
          parentNode: true
        },
        streamid: 'streamid'
      };
      var temp;
      var connection = {
        onstreamended: function(streamedObject){
          temp = streamedObject;
        }
      };
      var res = onStreamEndedHandler(streamedObject,connection);
      expect(JSON.stringify(temp)).to.equal(JSON.stringify(streamedObject));
    });
  });

  describe('onLeaveHandler', function(){
    it('should be a function', function(){
      expect(onLeaveHandler).to.be.a('function');
    });

    it('should decrease numberOfConnectedUsers', function(){
      var event = {
        userid : 'userid'
      }
      var connection = {
        numberOfConnectedUsers: 9,
        onleave: function(event){
        }
      }
      var res = onLeaveHandler(event,connection);
      expect(connection.numberOfConnectedUsers).to.equal(8);
    });

    it('should return  nothing', function(){
      onLeaveHandlerFiredFor['userid'] = 'something'
      var event = {
        userid : 'userid'
      }
      var connection = {
        numberOfConnectedUsers: 9,
        onleave: function(event){
        }
      }
      var res = onLeaveHandler(event,connection);
      expect(res).to.be.an('undefined');
    });
  });

  describe('takeSnapshot', function(){
    it('should be a function', function(){
      expect(takeSnapshot).to.be.a('function');
    });

    it('should return nothing', function(){
      var args = {
        userid: 'userid',
        connection: {
          snapshots: {
            userid: 'test'
          }
        },
        mediaElement: new Image(),
        callback : false
      };
      var res = takeSnapshot(args);
      expect(res).to.be.an('undefined');

    });

    it('should return snapshot', function(){
      var temp;
      var args = {
        userid: 'user-id',
        mediaElement: new Image(),
        connection: {
          snapshots: {},
        },
        callback : function(data){
          temp = data;
        }
      };
      var res = takeSnapshot(args);
      expect(temp).to.equal('data:,');
    });
    it('should return snapshot from stream', function(){
      var temp;
      var blob = new Blob([new Uint8Array(8)], {type:"image/png"});
      var args = {
        userid: 'user-id',
        mediaElement:false,
        connection: {
          snapshots: {},
          streams: {
            stream1: {
              userid: 'user-id',
              stream: {
                getVideoTracks: function() {
                  return 'param';
                }
              },
              mediaElement: new Image()
            }
          }
        },
        callback : function(data){
          temp = data;
        }
      };
      var res = takeSnapshot(args);
      expect(temp).to.equal('data:,');
    });

  });

});