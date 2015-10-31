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
        console.log("comment store comments received")
          setComments(payload.response);
          CommentStore.emit(FriendzConstants.COMMENTS_RECEIVED);
          break;
        case FriendzConstants.INNER_POST_CREATED_OR_CHANGED:
          // TODO: check if children also came back
          // TODO: figure out how to bring back children if subcomment list is showing
          setComments(payload.response);
          CommentStore.emit(FriendzConstants.INNER_POST_CREATED_OR_CHANGED);
          break;
      }
    })
  });
  CommentStore.setMaxListeners(200)
}(this));
