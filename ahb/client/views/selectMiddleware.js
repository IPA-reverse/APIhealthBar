Template.selectMiddleware.events({
  "click #submitMiddleware" : function() {
    console.log("pushing middleware...");
    credentials = {
      "key" : Session.get("apitoolsKey"),
      "monitorID": Session.get("apitoolsMonitorID"),
      "token": Session.get("XSRF-TOKEN")
    }
    serviceID = Session.get("apitoolsServiceID");

    Meteor.call("apitoolsPushMiddleware", serviceID, credentials, function(err, res){
        if(res){
          console.log("middleware res:", res);
          Blaze.insert(Blaze.render(Template.flowFinished), $('.jumbotron').get(0));
          $("#selectMiddleware").remove()
        }
    })
  }
})


Template.selectMiddleware.helpers({
    middleware:[
        {name:"Display",description:"A visual on a URL",icon:"thumbs-up"},
        {name:"Light",description:"Change color of your Hue Light",icon:"lightbulb-o"},
        {name:"Twitter",description:"Send a tweet with status",icon:"twitter"}
    ]
})
