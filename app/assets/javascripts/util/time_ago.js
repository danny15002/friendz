var TimeToWords = function (time) {
  var d = new Date(time);
  d -= d.getTimezoneOffset()*60000;
  var timeAgo = (Date.now() - d)/60000;

  return timeAgo;
}
