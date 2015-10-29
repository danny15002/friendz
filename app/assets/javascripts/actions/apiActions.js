ApiActions = {
  receiveCurrentUser: function (user) {
    var payload = {
      actionType: FriendzConstants.CURRENT_USER_RECEIVED,
      user: user
    }
    friendzDispatcher.dispatch(payload);
  },
  receiveMessages: function (messages) {
    var payload = {
      actionType: FriendzConstants.MESSAGES_RECEIVED,
      messages: messages
    }
    friendzDispatcher.dispatch(payload);
  },
  receiveFriends: function (response) {
    var payload ={
      actionType: FriendzConstants.FRIENDS_RECEIVED,
      response: response
    }
    friendzDispatcher.dispatch(payload);
  },
  createMessage: function (message, constant) {
    var payload ={
      actionType: FriendzConstants.MESSAGE_SENT,
      message: message
    }

    if (constant !== undefined) {
      payload.actionType = FriendzConstants.STATUS_POSTED
    }
    friendzDispatcher.dispatch(payload);
  },
  receiveEvents: function (events) {
    var payload = {
      actionType: FriendzConstants.EVENTS_RECEIVED,
      events: events
    }
    friendzDispatcher.dispatch(payload);
  },
  createEvent: function () {
    var payload = {
      actionType: FriendzConstants.EVENT_CREATED
    }
    friendzDispatcher.dispatch(payload);
  },
  receivePictures: function (pictures) {
    var payload = {
      actionType: FriendzConstants.PICTURES_RECEIVED,
      pictures: pictures
    }
    friendzDispatcher.dispatch(payload);
  },
  loginUser: function (jwt) {
    // Go to the Home page once the user is logged in
    //RouterContainer.get().transitionTo(‘/‘); // TODO: PUT THIS IN A CALLBACK
    // We save the JWT in localStorage to keep the user authenticated. We’ll learn more about this later.
    localStorage.setItem('jwt', jwt);
    // Send the action to all stores through the Dispatcher
    friendzDispatcher.dispatch({
      actionType: FriendzConstants.LOGIN_USER,
      jwt: jwt
    });
  },
  loginError: function (error) {
    friendzDispatcher.dispatch({
      actionType: FriendzConstants.FAILED_LOGIN,
      error: error.error
    });
  },
  signupUser: function (jwt) {
    // Go to the Home page once the user is logged in
    //RouterContainer.get().transitionTo(‘/‘); // TODO: PUT THIS IN A CALLBACK
    // We save the JWT in localStorage to keep the user authenticated. We’ll learn more about this later.
    localStorage.setItem('jwt', jwt);
    // Send the action to all stores through the Dispatcher
    friendzDispatcher.dispatch({
      actionType: FriendzConstants.SIGNUP_USER,
      jwt: jwt
    });
  },
  signupError: function (error) {
    friendzDispatcher.dispatch({
      actionType: FriendzConstants.FAILED_SIGNUP,
      error: error.error
    });
  },
  logout: function () {
    friendzDispatcher.dispatch({
      actionType: FriendzConstants.LOGOUT
    });
  },
  uploadPicture: function (response) {
    friendzDispatcher.dispatch({
      actionType: FriendzConstants.PICTURE_UPLOADED,
      response: response
    });
  },
  create: function (response, constant) {
    friendzDispatcher.dispatch({
      actionType: constant,
      response: response
    })
  },
  fetch: function (response, constant) {
    friendzDispatcher.dispatch({
      actionType: constant,
      response: response
    })
  },
  request: function (response, constant) {
    friendzDispatcher.dispatch({
      actionType: constant,
      response: response,
      messages: response
    })
  }
}
