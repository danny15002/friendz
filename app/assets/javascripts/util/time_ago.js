var TimeToWords = function (time) {
  var d = new Date(time);
  d -= d.getTimezoneOffset()*60000;
  var timeAgo = (Date.now() - d)/1000;

  if (timeAgo < 1) {
    return "1 second ago";
  }
  if (timeAgo < 60) {
    return Math.floor(timeAgo) + " seconds ago";
  }
  if (timeAgo < 120) {
    return "1 minute ago";
  }
  if (timeAgo < 3600) {
    return Math.floor(timeAgo/60) + " minutes ago";
  }
  timeAgo = timeAgo/3600;
  if (timeAgo < 2) {
    return "1 hour ago";
  }
  if (timeAgo < 24) {
    return Math.floor(timeAgo) + " hours ago"
  }
  if (timeAgo < 48) {
    return "1 day ago";
  }
  if (timeAgo < 168) {
    return Math.floor(timeAgo/24) + " days ago"
  }




  return timeAgo;
}
