(function(root) {
  'use strict';
  var _events = [];

  var setEvents = function (events) {
    _events = events;
  }

  EventStore = root.EventStore = $.extend({}, EventEmitter.prototype, {

    myEvents: function () {
      return _events.slice(0);
    },
    findById: function (id) {
      for (var i = 0; i < _events.length; i++) {
        if (id === _events[i].id) {
          return _events[i];
        }
      }
    },
    userEvents: function () {
      var eventArray = []
      for (var i = 0; i < _events.length; i++) {
        if (_events[i].creator === LoginStore.user().username){
          eventArray.push(_events[i])
        }
      }
      return eventArray
    },
    addChangeListener: function (changeEvent, callback) {
      this.on(changeEvent, callback);
    },
    removeChangeListener: function (changeEvent, callback) {
      this.removeListener(changeEvent, callback);
    },
    dispatcherID: friendzDispatcher.register( function(payload) {
      switch(payload.actionType) {
        case FriendzConstants.EVENTS_RECEIVED:
          setEvents(payload.events);
          EventStore.emit(FriendzConstants.EVENTS_RECEIVED);
          break;
        case FriendzConstants.EVENT_CREATED:
          EventStore.emit(FriendzConstants.EVENT_CREATED);
          break;
        case FriendzConstants.NEW_EVENTS_RECEIVED:
          setEvents(payload.response);
          EventStore.emit(FriendzConstants.NEW_EVENTS_RECEIVED)
          break;


      }
    })
  });
}(this));
