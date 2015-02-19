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
  },
  "apitoolsCreateService" : function(name, endpoint, credentials) {
    host = "https://" + credentials.key + "@" + credentials.monitorID + ".my.apitools.com/api/services";
    try {
      response = HTTP.post(host,
        {
          auth: credentials.key+":"+credentials.monitorID,
          headers: {"X-XSRF-TOKEN": credentials.token, "Content-Type" : "application/json"},
          data: {
            endpoints:[{
              url: endpoint,
              code: URLify2(name)
            }],
            name:name
          }
        });
      if (response.status == 201)
        return true
      else
        return false
      }
    catch (e) {
      throw new Meteor.Error(e)
    }

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

function uuid() {
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  var r, v;
  r = Math.random() * 16 | 0;
  v = c === 'x' ? r : r & 0x3 | 0x8;
  return v.toString(16);
});
}
