// Publications des données vers le client

Meteor.publish('lessons', function(){
  return Lessons.find();
})
