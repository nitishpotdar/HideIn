$( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 5000,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
    
    $( function() {
        $( "#datepicker1" ).datepicker({
          changeMonth: true,
          changeYear: true
        });
    } );
    
    $( function() {
        $( "#datepicker2" ).datepicker({
          changeMonth: true,
          changeYear: true
        });
      } );
    
    $( function() {
        $( "#resizable" ).resizable({
          handles: "se"
        });
      } );
    
    $( function() {
        $( "#tabs" ).tabs();
      } );
    
    $( function() {
        $( "#types" ).selectmenu();
      } );
    
    $( function() {
        $( "#draggable, #draggable-nonvalid" ).draggable({
        	containment: "#container"
        });
        $( "#droppable" ).droppable({
          containment: "#container",
          accept: "#draggable",
          classes: {
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
          },
          drop: function( event, ui ) {
            $( this )
              .addClass( "ui-state-highlight" )
              .find( "p" )
                .html( "Accepted!" );
          }
        });
      } );
    
  } );