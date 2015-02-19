if (Meteor.isClient){
Template.index.events({
  "click #authenticate" : function() {
    console.log("click");
    var key,
        monitorID;

    key = $("#key").val();
    monitorID = $("#monitorID").val();

    Meteor.call("apitoolsAuth", key, monitorID);
  }
})
}
