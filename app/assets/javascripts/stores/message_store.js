(function(root) {
  'use strict';
  var _messages = [];
  var _comments = {};

  var setMessages = function (messages) {
    _messages = messages;
  }

  var setMessageComments = function (comments) {
    _comments[comments.commentable_id]= comments.comments;
  }

  MessageStore = root.MessageStore = $.extend({}, EventEmitter.prototype, {

    getMessages: function () {
      return _messages.slice(0);
    },
    getMessageComments: function (id) {

    },
    addChangeListener: function (changeEvent, callback) {
      this.on(changeEvent, callback);
    },
    removeChangeListener: function (changeEvent, callback) {
      this.removeListener(changeEvent, callback);
    },
    dispatcherID: friendzDispatcher.register( function(payload) {
      switch(payload.actionType) {
        case FriendzConstants.MESSAGES_RECEIVED:
          setMessages(payload.messages);
          MessageStore.emit(FriendzConstants.MESSAGES_RECEIVED);
          break;
        case FriendzConstants.MESSAGE_SENT:
          MessageStore.emit(FriendzConstants.MESSAGE_SENT);
          break;
        case FriendzConstants.STATUS_POSTED:
          setMessages(payload.response);
          MessageStore.emit(FriendzConstants.STATUS_POSTED);
          break;
        case FriendzConstants.WALL_POST_CREATED:
          setMessages(payload.response);
          MessageStore.emit(FriendzConstants.WALL_POST_CREATED);
          break;
        case FriendzConstants.WALL_POST_LIKE:
          setMessages(payload.response);
          MessageStore.emit(FriendzConstants.WALL_POST_LIKE);
          break;
        case FriendzConstants.COMMENT_CREATED: // TODO: sub comment created instead
          var COMMENT_CONSTANT = FriendzConstants.COMMENT_CREATED + "_ON_" + payload.response.commentable_type + payload.response.commentable_id;
          MessageStore.emit(COMMENT_CONSTANT);
          MessageStore.emit(FriendzConstants.COMMENT_CREATED);
          break;
        default:
      }
    })
  });
}(this));
