// Fonction exécutée au rendu du template addLesson
Template.addLesson.onRendered(function(){

    this.autorun(function(){
        if (GoogleMaps.loaded()) {
            $(".js-address").geocomplete().bind("geocode:result", function(evt, res){
                address_object = res;
            });
        }
    })

});

// Gestion des evenements pour le template addLesson
Template.addLesson.events({

  'click .js-submit' : function(evt){
    var keys = [] , values = [];
    $('.js-address').trigger('geocode')

    LessonObject = {
        title : _.trim( $('input[name="title"]').val() ),
        description : _.trim( $('input[name="description"]').val() ),
        categorie : _.trim( $('input[name="categorie"]').val() ),
        level : parseInt( $('input[name="level"]').val() ),
        nbseats : parseInt( $('input[name="nbseats"]').val() ),
        date : moment( $('input[name="date"]').val() )._d,
        price : parseInt( $ ('input[name ="price"]').val() ),
    }

    LessonObject.address = {
        name : address_object.formatted_address,
        loc : {
            type : "Point",
            coordinates : [ address_object.geometry.location.lng() , address_object.geometry.location.lat() ]
        }

    }

    // Appel de la méthode d'ajout d'un cours
    Meteor.call('addLesson', LessonObject, function(err){
        if(err){
            console.log(err)
        }else{
            Router.go('home')
        }
    });

  }

});

// Helpers pour le template addLesson
Template.addLesson.helpers({
  //
});