if (Meteor.isServer) {

Meteor.methods({
  "apitoolsAuth" : function(key, monitorID) {
    host = "https://" + key + "@" + monitorID + ".my.apitools.com/";
    response = HTTP.get(host, { auth: key+":"+monitorID });
    return readCookie("XSRF-TOKEN", response.headers['set-cookie']);
  },
  "apitoolsListServices" : function(key, monitorID) {
    host = "https://" + key + "@" + monitorID + ".my.apitools.com/api/services";
    response = HTTP.get(host, { auth: key+":"+monitorID });
    return response.data;
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
