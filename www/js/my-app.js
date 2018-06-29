// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});


$$(document).on('deviceready', function() {
    console.log("Device is ready!");
       
    philiTrains();
});     
/*----------------------------------------------------*/


 function philiTrains()
        {
       
            /*----------create station drop down-------------------*/
            for(var i=0; i < stations.length; i++)
            {
                $$('#stations').append("<option value='" + stations[i].stationNum + "'>" + stations[i].stationName + "</option>");
            }
        }
            /*-----------------------------------------------------*/



/*--------------fetching the json-Object------------------*/
               $$('#fetchTrainDetails').on('touchend', function(){
               var stationNumber = $$('#stations').val();
                $$.ajax({
                    type: 'GET',
                    dataType: "jsonp",
                    url:"http://www3.septa.org/hackathon/Arrivals/" + stationNumber + "/10/",
                    success: function(result){
                    parseJSON(result);
                        }
                });

                $$("#schedule").html("");
  
                }); 
/*-----------------------------------------------------*/      


/*--------------------parseJSON------------------------*/
        function parseJSON(result)
        {
            console.log(result);
        
                var output = "<center><h3>Northbound</h3></center>";
                output += "<table class='philiTable'>";
                output += "<tr><th>Train <br><i class='fas fa-subway'></i></th><th>Time <br><i class='far fa-clock''></i></th><th>Destination<br><i class='fas fa-map-signs'></i></th><th>Service<br><i class='fas fa-file-signature'></i></th><th>Status<br><i class='fas fa-hourglass-half'></i></th></tr>";
            
                /*----- JSON.parse ----*/
                var data = JSON.parse(result);
                var arr = data[Object.keys(data)];
                var northbound = arr[0].Northbound;
                for(var i=0; i < northbound.length; i++)
                {
                        output +=  ` 
                    <tr>
                    <td> ${northbound[i].train_id} </td>
                    <td> ${northbound[i].depart_time} </td>
                    <td> ${northbound[i].destination} </td>
                    <td> ${northbound[i].service_type} </td>
                    <td> ${northbound[i].status} </td>
                    </tr>
                   `;
                }
                output += "</table>";
                $$('#schedule').append(output); /*--- instead of innerHTML += ---*/                   
                
            
            
            
                var southbound = arr[1].Southbound;
                var output2 = "<br><center><h3>Southbound</h3></center>";
                output2 += "<table class='philiTable'>";
                output2 += "<tr><th>Train <br><i class='fas fa-subway'></i></th><th>Time <br><i class='far fa-clock''></i></th><th>Destination<br><i class='fas fa-map-signs'></i></th><th>Service<br><i class='fas fa-file-signature'></i></th><th>Status<br><i class='fas fa-hourglass-half'></i></th></tr>";
                for(var i=0; i < southbound.length; i++)
                {
                    output2 += ` 
                    <tr>
                    <td> ${southbound[i].train_id} </td>
                    <td> ${southbound[i].depart_time} </td>
                    <td> ${southbound[i].destination} </td>
                    <td> ${southbound[i].service_type} </td>
                    <td> ${southbound[i].status} </td>
                    </tr>
                   `;
                }
            output2 += "</table>";
                 $$('#schedule').append(output2);   
        }