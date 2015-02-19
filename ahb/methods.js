if (Meteor.isServer) {

Meteor.methods({
  "apitoolsAuth" : function(key, monitorID) {
    host = "https://" + key + "@" + monitorID + ".my.apitools.com/";
    HTTP.get(host, { auth: key+":"+monitorID }, function(err, res) {
      token = readCookie("XSRF-TOKEN", res.headers['set-cookie']);
      console.log(token);
    })
  }
});

}

function readCookie(name, headers) {
  var cookiename = name + "=";
  var ca = headers;

  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(cookiename) == 0)
      return c.substring(cookiename.length,c.length).split(";")[0];
  }
  return null;
}
