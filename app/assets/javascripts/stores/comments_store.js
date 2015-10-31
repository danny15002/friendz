(function(root) {
  'use strict';
  var _comments = {};

  var setComments = function (comments) {
    _comments[comments.type] = _comments[comments.type] || {};
    _comments[comments.type][comments.commentableId] = comments.comments;
  }

  CommentStore = root.CommentStore = $.extend({}, EventEmitter.prototype, {

    getComments: function (id, type) {
      if (_comments[type] === undefined) {
        return [];
      } else if (_comments[type][id] === undefined) {
        return [];
      } else {
        return _comments[type][id];
      }
    },

    setComments: function (comments) {
      _comments[comments.type] = _comments[comments.type] || {};
      _comments[comments.type][comments.commentableId] = comments.comments;
    },

    getCommentsHash: function () {
      return _comments;
    },

    addChangeListener: function (changeEvent, callback) {
      this.on(changeEvent, callback);
    },
    removeChangeListener: function (changeEvent, callback) {
      this.removeListener(changeEvent, callback);
    },
    dispatcherID: friendzDispatcher.register( function(payload) {
      switch(payload.actionType) {
        case FriendzConstants.COMMENTS_RECEIVED:
          setComments(payload.response);
          CommentStore.emit(FriendzConstants.COMMENTS_RECEIVED);
          break;
        case FriendzConstants.INNER_POST_CREATED_OR_CHANGED:
          if (payload.response.messages) {
            MessageStore.setMessages(payload.response.messages)
            MessageStore.emit(FriendzConstants.WALL_POST_CREATED);
          }
          if (payload.response.comments) {
            setComments(payload.response);
          }
          if (payload.response.subcomments) {
            CommentStore.setComments(payload.response.subcomments)
          }
          CommentStore.emit(FriendzConstants.INNER_POST_CREATED_OR_CHANGED)
          break;
      }
    })
  });
  CommentStore.setMaxListeners(200)
}(this));
