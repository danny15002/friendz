ApiUtil = {
  fetchCurrentUser: function () {
    $.ajax({
      url: 'session',
      method: 'get',
      success: function (user) {
        ApiActions.receiveCurrentUser(user);
      }
    });
  },
  fetchMessages: function (type, id) {
    var data;
    if (id === undefined) {
      data = {public: type}
    } else {
      data = {public:type, user_id: id}
    }
    $.ajax({
      url: '/api/messages',
      method: 'get',
      data: data,
      success: function (messages) {
        ApiActions.receiveMessages(messages);
      }
    });
  },
  fetchPictures: function (id) {
    $.ajax({
      url: '/api/pictures',
      method: 'get',
      data: {id: id},
      success: function (pictures) {
        ApiActions.receivePictures(pictures);
      }
    });
  },
  fetchFriends: function (id) {
    $.ajax({
      url: 'users',
      method: 'get',
      data: {id: id},
      success: function (friends) {
        ApiActions.receiveFriends(friends);
      }
    })
  },
  createMessage: function (message, constant) {
    $.ajax({
      url: 'api/messages',
      method: 'post',
      data: {message: message},
      success: function (response) {
        ApiActions.createMessage(response, constant);
      }
    })
  },
  fetchEvents: function () {
    $.ajax({
      url: 'api/events',
      method: 'get',
      success: function (events) {
        ApiActions.receiveEvents(events);
      }
    })
  },
  createEvent: function (event) {
    $.ajax({
      url: 'api/events',
      method: 'post',
      data: {event: event},
      success: function () {
        ApiActions.createEvent();
      }
    })
  },
  signup: function (user) {
    $.ajax({
      url: "users",
      method: 'POST',
      type: 'json',
      data: {user: user},
      success: function(response) {
        var jwt = response.id_token;
        ApiActions.signupUser(jwt);
      },
      error: function (response) {
        ApiActions.signupError(JSON.parse(response.responseText));
      }
    })
  },
  login: function (username, password) {
    var user = {username: username, password: password};
    $.ajax({
      url: "session",
      method: 'POST',
      type: 'json',
      data: {user: user},
      success: function(response) {
        // We get a JWT back.
        var jwt = response.id_token;
        // // We trigger the LoginAction with that JWT.
        ApiActions.loginUser(jwt);
      },
      error: function (response) {
        ApiActions.loginError(JSON.parse(response.responseText));
      }
    })
  },
  logout: function () {
    $.ajax({
      url: "session",
      method: 'DELETE',
      success: function (response) {
        ApiActions.logout();
      }
    })
  },
  uploadPicture: function (picture) {
    $.ajax({
      url: "api/pictures",
      method: 'POST',
      data: {picture: picture},
      success: function (response) {
        ApiActions.uploadPicture(response)
      }
    });
  },
  create: function (reqInfo) {
    var callback;

    $.ajax({
      url: reqInfo.url,
      method: 'POST',
      data: reqInfo.data,
      success:  function (response) {
        ApiActions.create(response, reqInfo.constant)
      }
    });
  },
  fetch: function (reqInfo) {
    var callback;

    $.ajax({
      url: reqInfo.url,
      method: 'GET',
      data: reqInfo.data,
      success:  function (response) {
        ApiActions.fetch(response, reqInfo.constant)
      }
    });
  },
  request: function (reqInfo) {
    $.ajax({
      url: reqInfo.url,
      method: reqInfo.method,
      data: reqInfo.data,
      success:  function (response) {
        ApiActions.request(response, reqInfo.constant)
      }
    });
  }
}
