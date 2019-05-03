$(document).on("click", ".open-AddBookDialog", function () {
     var aptname = $(this).data('aptname');
     var aptloc = $(this).data('aptloc');
     var bedrooms = $(this).data('bedrooms');
     var roommates = $(this).data('roommates');
     var baths = $(this).data('baths');
     var rent = $(this).data('rent');
     var avafrom = $(this).data('avafrom');
     var avatill = $(this).data('avatill');
     var available = $(this).data('available');
     var desc = $(this).data('desc');
     var meal = $(this).data('meal');
     var pets = $(this).data('pets');
     var contact = $(this).data('contact');
     var email = $(this).data('email');
     var number = $(this).data('number');
     $(".modal-body #aptname").val( aptname );
     $(".modal-body #aptloc").val( aptloc );
     $(".modal-body #bedrooms").val( bedrooms );
     $(".modal-body #roommates").val(roommates);
     $(".modal-body #baths").val( baths );
     $(".modal-body #rent").val( rent );
     $(".modal-body #avafrom").val( avafrom );
     $(".modal-body #avatill").val( avatill );
     $(".modal-body #available").val( available );
     $(".modal-body #desc").val( desc );
     $(".modal-body #meal").val( meal );
     $(".modal-body #pets").val( pets );
     $(".modal-body #contact").val( contact );
     $(".modal-body #email").val( email );
     $(".modal-body #number").val( number );
});

$(document).on("click", ".open-DeleteDialog1", function () {
    var id = $(this).data('id1');
    $(".modal-footer #delete1").val(id); 
});

$(document).on("click", ".open-DeleteDialog2", function () {
    var id = $(this).data('id2');
    $(".modal-footer #delete2").val(id); 
});

$(document).on("click", ".open-DeleteDialog3", function () {
    var id = $(this).data('id3');
    $(".modal-footer #delete3").val(id); 
});

$(document).on("click", ".open-DeleteDialog4", function () {
    var id = $(this).data('id4');
    $(".modal-footer #delete4").val(id); 
});


