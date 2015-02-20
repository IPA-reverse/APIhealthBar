if (Meteor.isClient){
Template.auth.events({
  "click #authenticate" : function() {
    console.log("click");
    var key,
        monitorID;

    key = $("#key").val();
    monitorID = $("#monitorID").val();

    Session.set("apitoolsKey", key)
    Session.set("apitoolsMonitorID", monitorID)

    Meteor.call("apitoolsAuth", key, monitorID, function(err, res) {
      if(res){
        Session.set("XSRF-TOKEN", res);
        Blaze.insert(Blaze.render(Template.newService), $('.jumbotron').get(0));
        $("#auth").remove()
        }
    });
  },
  "click #listServices" : function() {
    key = Session.get("apitoolsKey");
    monitorID = Session.get("apitoolsMonitorID");
    Meteor.call("apitoolsListServices", key, monitorID, function(err, res) {
      Session.set("apitoolsServicesList", res);
    });

  }
})

Template.newService.events({
  "click #createService" : function() {
    name = $('#serviceName').val();
    url = $('#serviceURL').val();
    credentials = {
      "key" : Session.get("apitoolsKey"),
      "monitorID": Session.get("apitoolsMonitorID"),
      "token": Session.get("XSRF-TOKEN")
    }
    Meteor.call("apitoolsCreateService", name, url, credentials, function(err, res) {
      if(res){
          console.log(res)
          Session.set("apitoolsServiceID", res["_id"]);
          Meteor.call('insertService',name, url,res["_id"], credentials)
          Blaze.insert(Blaze.render(Template.selectMiddleware), $('.jumbotron').get(0));
          $("#newService").remove()
      }
    })

  }
})

Template.servicesList.helpers({
  "services": function() {
    return Session.get("apitoolsServicesList");
  }
})

}
