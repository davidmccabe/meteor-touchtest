Things = new Meteor.Collection("things");

if (Meteor.isClient) {
  Template.things.things = function() {
    return Things.find({}, {});
  };
  
  Template.thing.selected = function() {
    return this.selected ? "selected" : "";
  };
  
  Template.thing.events({
    'mousedown .thing, touchstart .thing': function(event) {
      console.log("start");
      Things.update(this._id, {$set: {selected:true}});
    },
    'mouseup .thing, touchend .thing': function(event) {
      console.log("end");
      Things.update(this._id, {$set: {selected:false}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Things.find().count() === 0) {
      Things.insert({selected:false});
    }
  });
}