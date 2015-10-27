(function(root) {
  'use strict';
  var _jwt = localStorage.jwt;
  var _user = null;
  var _error = "";
  var _myFriends = [];
  if (_jwt) {
    _user = jwt_decode(_jwt);
  }

  var setMyFriends = function (friends) {
    _myFriends = friends;
  }

  LoginStore = root.LoginStore = $.extend({}, EventEmitter.prototype, {
    user: function () {
      return _user;
    },

    jwt: function () {
      return _jwt;
    },

    getError: function () {
      return _error;
    },

    getMyFriends: function () {
      return _myFriends.slice();
    },

    getFriendShipId: function (id) {
      for (var i = 0; i < _myFriends.length; i++) {
        if (id === _myFriends[i].friend_id ) {
          return _myFriends[i].id
        }
      }
    },

    isLoggedIn: function () {
      return !!_user;
    },
    resetSession: function () {
      localStorage.clear();
      _jwt = null;
      _user = null;
    },
    addChangeListener: function (changeEvent, callback) {
      this.on(changeEvent, callback);
    },
    removeChangeListener: function (changeEvent, callback) {
      this.removeListener(changeEvent, callback);
    },
    dispatcherID: friendzDispatcher.register( function(payload) {
      switch(payload.actionType) {
        case FriendzConstants.LOGIN_USER:
          // We get the JWT from the action and save it locally.
          _jwt = payload.jwt;
          // Then we decode it to get the user information.
          _user = jwt_decode(_jwt);
          // And we emit a change to all components that are listening.
          // This method is implemented in the `BaseStore`.
          LoginStore.emit(FriendzConstants.LOGIN_USER);
          break;
        case FriendzConstants.FAILED_LOGIN:
          _error = payload.error;
          LoginStore.emit(FriendzConstants.FAILED_LOGIN);
          break;
        case FriendzConstants.SIGNUP_USER:
          _jwt = payload.jwt;
          _user = jwt_decode(_jwt);
          LoginStore.emit(FriendzConstants.SIGNUP_USER);
          break;
        case FriendzConstants.FAILED_SIGNUP:
          _error = payload.error;
          LoginStore.emit(FriendzConstants.FAILED_SIGNUP);
          break;
        case FriendzConstants.LOGOUT:
          LoginStore.resetSession();
          LoginStore.emit(FriendzConstants.LOGOUT);
          break;
        case FriendzConstants.MY_FRIENDS_RECEIVED:
          setMyFriends(payload.response);
          LoginStore.emit(FriendzConstants.MY_FRIENDS_RECEIVED);
          break;
        default:
          LoginStore.emit(payload.actionType)
          break;
      };
    })
  });
}(this));
