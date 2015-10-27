(function(root) {
  'use strict';
  var _requests = [];
  var _notifications = [];

  var setRequests = function (requests) {
    _requests = requests;
  }
  var setNotifications = function (notifications) {
    _notifications = notifications;
  }

  AlertStore = root.AlertStore = $.extend({}, EventEmitter.prototype, {

    getMyRequests: function () {
      return _requests.slice(0);
    },

    getMyNotifications: function () {
      return _notifications.slice(0);
    },

    addChangeListener: function (changeEvent, callback) {
      this.on(changeEvent, callback);
    },
    removeChangeListener: function (changeEvent, callback) {
      this.removeListener(changeEvent, callback);
    },
    dispatcherID: friendzDispatcher.register( function(payload) {
      switch(payload.actionType) {
        case FriendzConstants.FETCH_REQUESTS:
          setRequests(payload.response)
          AlertStore.emit(FriendzConstants.FETCH_REQUESTS)
          break;
      }
    })
  });
}(this));
