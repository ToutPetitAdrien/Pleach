Template.lesson.onRendered(function(){

    lessonLocation = this.data.public.address.loc.coordinates

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers : true});

    request = {
        origin : new google.maps.LatLng(Session.get('userLatLng')[0], Session.get('userLatLng')[1]),
        destination : new google.maps.LatLng(lessonLocation[1], lessonLocation[0]),
        travelMode : google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
            directionsDisplay.setMap(gmap);
        }
    });

});

Template.lesson.helpers({
    'isRegistered' : function(){
        return this.private && this.private.registered.indexOf( Meteor.userId() ) > -1 
    }
});

Template.lesson.events({
    'click .js-entry' : function(){
        id = this._id
        Meteor.call('addParticipant', id, function(err){
            if(err){
                console.log(err)
            }
        })
    }
});
