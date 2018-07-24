// Create a Stripe client.
var stripe = Stripe('pk_test_0U6K7eIq032LINQia1VlDOcK');

// Create an instance of Elements.
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
  base: {
    color: '#32325d',
    lineHeight: '14px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '18px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// Create an instance of the card Element.
var card = elements.create('card', {style: style});


// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission.
var form = document.getElementById('payment-form');









// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initMap() {
  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 1000
  });
    
   
    
    
  var card = document.getElementById('pac-card');
  var input = document.getElementById('start');
  var input2 = document.getElementById('end');
  var types = document.getElementById('type-selector');
  var strictBounds = document.getElementById('strict-bounds-selector');



  var autocomplete = new google.maps.places.Autocomplete(input);
  var autocomplete2 = new google.maps.places.Autocomplete(input2);


  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(
      ['address_components', 'geometry', 'icon', 'name']);
    
    autocomplete2.setFields(
      ['address_components', 'geometry', 'icon', 'name']);

 

  autocomplete.addListener('place_changed', function() {
   
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }



  
  });
    
    autocomplete2.addListener('place_changed', function() {
   
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }


  
  });
    
    
     var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
    
     directionsDisplay.setMap(map);

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    var bounds = new google.maps.LatLngBounds;
        var markersArray = [];

        var origin2 = document.getElementById('start').value;
        var destinationB = document.getElementById('end').value;

        var destinationIcon = 'https://chart.googleapis.com/chart?' +
            'chst=d_map_pin_letter&chld=D|FF0000|000000';
        var originIcon = 'https://chart.googleapis.com/chart?' +
            'chst=d_map_pin_letter&chld=O|FFFF00|000000';
     
        var geocoder = new google.maps.Geocoder;

        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [origin2],
          destinations: [destinationB],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            var outputDiv = document.getElementById('output');
              outputDiv.style.display = 'block'
            deleteMarkers(markersArray);

            var showGeocodedAddressOnMap = function(asDestination) {
              var icon = asDestination ? destinationIcon : originIcon;
              return function(results, status) {
                if (status === 'OK') {
                  map.fitBounds(bounds.extend(results[0].geometry.location));
                   map.setZoom(100);
                  markersArray.push(new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    icon: icon,
                  }));
                } else {
                  alert('Geocode was not successful due to: ' + status);
                }
              };
            };
              showGeocodedAddressOnMap(true)
              
              
 
               document.getElementById('startResult').innerText = originList[0];
              
              
        document.getElementById('endResult').innerText = destinationList[0];
        
        document.getElementById('distanceResult').innerText = (parseFloat(response.rows[0].elements[0].distance.text.replace(' km', ''))*0.621371).toFixed(2) + ' miles'; 
        
              
              document.getElementById('durationResult').innerText = response.rows[0].elements[0].duration.text; 
              
             var passengerCount = parseInt(document.getElementById('select').value);
             
             var distanceCost;
                
             var durationCost;
              
             var bookingFee;
              
             var minimumFare;
              
             var fare;
              
              
              if (passengerCount === 1) {
                
                  distanceCost = (parseFloat(response.rows[0].elements[0].distance.text.replace(' km', ''))*0.621371) * 1.25;
                  
                  durationCost = parseFloat(response.rows[0].elements[0].duration.text.replace(' mins', '')) * .50;
                  
                  bookingFee = 2;
                  
                  minimumFare = 16;
                  
                  fare = distanceCost + durationCost + bookingFee
  
                  if (fare.toFixed(2) < minimumFare) {
                     fare = minimumFare + bookingFee
                      
                  } else {
                      
                      fare = distanceCost + durationCost + bookingFee
                  }
                  
                  document.getElementById('fareResult').innerText = '$' + fare.toFixed(2)
                      
                  if (document.getElementById('defaultCheck1').checked === true) {
                      document.getElementById('fareResult').innerText += ' +$35 (annual registration fee)'
                  } 
   
              }
              
              
              if (passengerCount === 2) {
                
                  distanceCost = (parseFloat(response.rows[0].elements[0].distance.text.replace(' km', ''))*0.621371) * .75;
                  
                  durationCost = parseFloat(response.rows[0].elements[0].duration.text.replace(' mins', '')) * .30;
                  
                  bookingFee = 2;
                  
                  minimumFare = 20;
                  
                  fare = (distanceCost + durationCost)*2 + bookingFee
                  
                 if (fare.toFixed(2) < minimumFare) {
                     fare =  minimumFare*2 + bookingFee
                     
                  } else {
                     
                      fare = (distanceCost + durationCost)*2 + bookingFee
                  }
                  
                  
                  document.getElementById('fareResult').innerText = '$' + fare.toFixed(2)
                  
                  if (document.getElementById('defaultCheck1').checked === true) {
                      document.getElementById('fareResult').innerText += ' +$35 (annual registration fee)'
                  } 
   
              }
              
              
              if (passengerCount === 3) {
                
                  distanceCost = (parseFloat(response.rows[0].elements[0].distance.text.replace(' km', ''))*0.621371) * .63;
                  
                  durationCost = parseFloat(response.rows[0].elements[0].duration.text.replace(' mins', '')) * .25;
                  
                  bookingFee = 1;
                  
                  minimumFare = 24;
                                    
                  fare = (distanceCost + durationCost)*3 + bookingFee
                  
                  if (fare.toFixed(2) < minimumFare) {
                      fare =  minimumFare*3 + bookingFee
                      
                      
                  } else {
                     fare = (distanceCost + durationCost)*3 + bookingFee
                      
                  }
                  
                  document.getElementById('fareResult').innerText = '$' + fare.toFixed(2)
                  
                  if (document.getElementById('defaultCheck1').checked === true) {
                      document.getElementById('fareResult').innerText += ' +$35 (annual registration fee)'
                  } 
   
              }
              
              
              if (passengerCount === 4) {
                
                  distanceCost = (parseFloat(response.rows[0].elements[0].distance.text.replace(' km', ''))*0.621371) * .50;
                  
                  durationCost = parseFloat(response.rows[0].elements[0].duration.text.replace(' mins', '')) * .20;
                  
                  bookingFee = 1;
                  
                  minimumFare = 28;
                  
                  fare = (distanceCost + durationCost)*4 + bookingFee
                 
                  
                  if (fare.toFixed(2) < minimumFare) {
                     fare =  minimumFare*4 + bookingFee
                      
                  } else {
                    fare = (distanceCost + durationCost)*4 + bookingFee
                      
                  }
                  
                   document.getElementById('fareResult').innerText = '$' + fare.toFixed(2)
                  
                  if (document.getElementById('defaultCheck1').checked === true) {
                      document.getElementById('fareResult').innerText += ' +$35 (annual registration fee)'
                  } 
   
              }
              
              
              
              document.getElementById('invisibleButton').click()
              
              
              
           
          }
        });

      
  };
  document.getElementById('eventButton').addEventListener('click', onChangeHandler);

}

function start() {
        
    
}




     


      function deleteMarkers(markersArray) {
        for (var i = 0; i < markersArray.length; i++) {
          markersArray[i].setMap(null);
        }
        markersArray = [];
      }

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: document.getElementById('start').value,
    destination: document.getElementById('end').value,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}



function stripeModalPopup() {
      var modal = document.getElementById('stripeModal');
    var span = document.getElementsByClassName("stripeClose")[0];
    modal.style.display = "block";
    
    span.onclick = function() {
    modal.style.display = "none";
        card.clear()
}
   

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        card.clear()
    }
}
}


function modalPopup() {
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close1")[0];
    modal.style.display = "block";
    
    span.onclick = function() {
    modal.style.display = "none";
     
}
   document.getElementById('closeButton').onclick = function() {
    modal.style.display = "none";
     
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    
    }
}
}


function addChildren() {
    var formGroup = document.createElement('div')
    formGroup.className = 'form-group child'
    
    var label = document.createElement('label')
    label.innerText = 'Child'
    
    var name = document.createElement('input')
    name.placeholder = 'Full Name'
    name.type = 'text'
    name.className = 'form-control'
    
    var gender = document.createElement('input')
    gender.placeholder = 'Gender'
    gender.type = 'text'
    gender.className = 'form-control'
    
    var dob = document.createElement('input')
    dob.placeholder = 'Date of Birth'
    dob.type = 'text'
    dob.className = 'form-control'
    
    var school = document.createElement('input')
    school.placeholder = 'Current School'
    school.type = 'text'
    school.className = 'form-control'
    
    var teacher = document.createElement('input')
    teacher.placeholder = "Teacher's Name"
    teacher.type = 'text'
    teacher.className = 'form-control'
    
    var label2 = document.createElement('label')
    label2.innerText = 'Booster Seat?'
    
    var div = document.createElement('div')
    div.className = 'form-check'
    var checkbox = document.createElement('input')
    checkbox.className = 'form-check-input'
    checkbox.value = 'Yes'
    checkbox.type = 'checkbox'
    checkbox.id = 'defaultCheck' + Math.floor(Math.random() * 1000);
    checkbox.setAttribute('onclick', 'display(this.id)')
    var label3 = document.createElement('label')
    label3.className = 'form-check-label'
    label3.innerText = 'Yes'
    div.appendChild(checkbox)
    div.appendChild(label3)
    
    var div2 = document.createElement('div')
    div2.style.display = 'none'
    var height = document.createElement('input')
    height.type = 'text'
    height.className = 'form-control'
    height.placeholder = "Child's Height"
    var weight = document.createElement('input')
    weight.type = 'text'
    weight.className = 'form-control'
    weight.placeholder = "Child's Weight"
    div2.appendChild(height)
    div2.appendChild(weight)
    
    var additionalChildren = document.getElementById('additionalChildren')
    additionalChildren.appendChild(formGroup)
    formGroup.appendChild(label)
    formGroup.appendChild(name)
    formGroup.appendChild(gender)
    formGroup.appendChild(dob)
    formGroup.appendChild(school)
    formGroup.appendChild(teacher)
    formGroup.appendChild(label2)
    formGroup.appendChild(div)
    formGroup.appendChild(div2)
    
}


function display(clicked_id) {
    var checkbox = document.getElementById(clicked_id)
    
    if (checkbox.checked === true) {
    checkbox.parentElement.nextElementSibling.style.display = 'block'
    } else {
        checkbox.parentElement.nextElementSibling.style.display = 'none'
    }
}



function logInfo() {
    
    var generalInfo = {
        homeAddress: document.getElementById('homeAddress').value,
        homePhone: document.getElementById('homePhone').value
    }
    
    var parentOne = {
        name: document.getElementById('parent1').firstElementChild.nextElementSibling.value,
        cellNumber: document.getElementById('parent1').firstElementChild.nextElementSibling.nextElementSibling.value,
        email: document.getElementById('parent1').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value,
        workAddress: document.getElementById('parent1').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value,
        workPhone: document.getElementById('parent1').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value
    }
    
    var parentTwo = {
        name: document.getElementById('parent2').firstElementChild.nextElementSibling.value,
        cellNumber: document.getElementById('parent2').firstElementChild.nextElementSibling.nextElementSibling.value,
        email: document.getElementById('parent2').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value,
        workAddress: document.getElementById('parent2').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value,
        workPhone: document.getElementById('parent2').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value
    }
    
    
    var childrenObjects =[]
    
    var childrenElements = document.querySelectorAll('.child')
    for (i=0; i<childrenElements.length; i++) {
        
        var boosterSeat
        if (childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.checked === true) {
            boosterSeat = 'Yes'
        } else {
            boosterSeat = 'No'
        }
        
        var child = {
            name: childrenElements[i].firstElementChild.nextElementSibling.value,
            gender: childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.value,
            dateOfBirth: childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value,
            currentSchool: childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value,
            teacherName: childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value,
            booster: boosterSeat,
            height: childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.value,
            weight: childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.value     
        }
        
        childrenObjects.push(child)
    }
    
    var emergencyContact1 = {
        name: document.getElementById('emergency1').firstElementChild.nextElementSibling.value,
        relationship: document.getElementById('emergency1').firstElementChild.nextElementSibling.nextElementSibling.value,
        number: document.getElementById('emergency1').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value,
    }
    
    var emergencyContact2 = {
        name: document.getElementById('emergency2').firstElementChild.nextElementSibling.value,
        relationship: document.getElementById('emergency2').firstElementChild.nextElementSibling.nextElementSibling.value,
        number: document.getElementById('emergency2').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value,
    }
    
    var additionalInfo = document.getElementById('comment').value
    
}



function stripeAppear() {
    document.getElementById('newPay').style.display = 'block'
    document.getElementById('paypal-button').style.display = 'none'
    document.getElementById('useCard').innerText = 'Submit'
    document.getElementById('useCard').setAttribute('onclick', 'submit()')
    
    var paymentLabel = document.getElementById('paymentLabel')
    
    var fareResult = document.getElementById('fareResult').innerText

    if (fareResult.includes('(annual registration fee)') ) {
        var stringFare = fareResult.replace('$', '').replace('$', '').replace('(annual registration fee)', '')
        var newFare = 
            parseFloat(stringFare .split('+')[0]) + parseFloat(stringFare.split('+')[1])
        paymentLabel.innerHTML = '<strong>Payment</strong> - $' + newFare.toString()
    } else {
        var newFare = fareResult.replace('$', '')
        paymentLabel.innerHTML = '<strong>Payment</strong> - $' + newFare.toString()

    }
    
}



function submit() {
    
    var annualFeeIncluded
    
    if (document.getElementById('defaultCheck1').checked===true) {
        annualFeeIncluded = 'Yes'
    } else {
        annualFeeIncluded = 'No'
    }
    
    var charge = parseInt(document.getElementById('paymentLabel').innerText.replace('Payment - $', '').replace('.', ''))
    
var chargeAmountWithDecimal = parseFloat(document.getElementById('paymentLabel').innerText.replace('Payment - $', '') )
                                         
                                         
    var generalInfo = {
        homeAddress: document.getElementById('homeAddress').value,
        homePhone: document.getElementById('homePhone').value
    }
    
    var parentOne = {
        name: document.getElementById('parent1').firstElementChild.nextElementSibling.value,
        cellNumber: document.getElementById('parent1').firstElementChild.nextElementSibling.nextElementSibling.value,
        email: document.getElementById('parent1').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value,
        workAddress: document.getElementById('parent1').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value,
        workPhone: document.getElementById('parent1').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value
    }
    
    var parentTwo = {
        name: document.getElementById('parent2').firstElementChild.nextElementSibling.value,
        cellNumber: document.getElementById('parent2').firstElementChild.nextElementSibling.nextElementSibling.value,
        email: document.getElementById('parent2').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value,
        workAddress: document.getElementById('parent2').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value,
        workPhone: document.getElementById('parent2').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value
    }
    
    
    var childrenObjects =[]
    
    var childrenElements = document.querySelectorAll('.child')
    for (i=0; i<childrenElements.length; i++) {
        
        var boosterSeat
        if (childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.checked === true) {
            boosterSeat = 'Yes'
        } else {
            boosterSeat = 'No'
        }
        
        var child = {
            name: childrenElements[i].firstElementChild.nextElementSibling.value,
            gender: childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.value,
            dateOfBirth: childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value,
            currentSchool: childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value,
            teacherName: childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value,
            booster: boosterSeat,
            height: childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.value,
            weight: childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.value     
        }
        
        childrenObjects.push(child)
    }
    
    var emergencyContact1 = {
        name: document.getElementById('emergency1').firstElementChild.nextElementSibling.value,
        relationship: document.getElementById('emergency1').firstElementChild.nextElementSibling.nextElementSibling.value,
        number: document.getElementById('emergency1').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value,
    }
    
    var emergencyContact2 = {
        name: document.getElementById('emergency2').firstElementChild.nextElementSibling.value,
        relationship: document.getElementById('emergency2').firstElementChild.nextElementSibling.nextElementSibling.value,
        number: document.getElementById('emergency2').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value,
    }
    
    var additionalInfo = document.getElementById('comment').value
    
    var cardName = document.getElementById('cardName').value
    
    stripe.createToken(card, { name: cardName}).then(function(result) {
    if (result.error) {
      // Inform the user if there was an error.
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      
        // Send the token to your server.

        
        //Creates an object to send to the server
        const input = {
        paymentMethod: "Stripe",
        annualFeeIncluded: annualFeeIncluded,
        token : result.token.id,
        charge: charge,
        chargeAmountWithDecimal: chargeAmountWithDecimal,
        generalInfo: generalInfo,
        parentOne: parentOne,
        parentTwo: parentTwo,
        childrenObjects: childrenObjects,
        emergencyContact1: emergencyContact1,
        emergencyContact2: emergencyContact2,
        additionalInfo: additionalInfo  
        }
        
            
        
        
        fetch("https://lilpeeps.herokuapp.com/registerStripe", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(input)
        })
            .then(response => {
                return response.json();
                
            })
        
            .then(output => {
           

            
            })

   
        }   
   
    })
        document.getElementById('hiddenButton1').click()
    document.getElementById('hiddenButton2').click()
        document.getElementById('thankyou').style.display = 'block'
}





function sendEmailPayPal() {
    var annualFeeIncluded
    
    if (document.getElementById('defaultCheck1').checked===true) {
        annualFeeIncluded = 'Yes'
    } else {
        annualFeeIncluded = 'No'
    }
    
    var charge = parseInt(document.getElementById('paymentLabel').innerText.replace('Payment - $', '').replace('.', ''))
    
var chargeAmountWithDecimal = parseFloat(document.getElementById('paymentLabel').innerText.replace('Payment - $', '') )
                                         
                                         
    var generalInfo = {
        homeAddress: document.getElementById('homeAddress').value,
        homePhone: document.getElementById('homePhone').value
    }
    
    var parentOne = {
        name: document.getElementById('parent1').firstElementChild.nextElementSibling.value,
        cellNumber: document.getElementById('parent1').firstElementChild.nextElementSibling.nextElementSibling.value,
        email: document.getElementById('parent1').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value,
        workAddress: document.getElementById('parent1').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value,
        workPhone: document.getElementById('parent1').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value
    }
    
    var parentTwo = {
        name: document.getElementById('parent2').firstElementChild.nextElementSibling.value,
        cellNumber: document.getElementById('parent2').firstElementChild.nextElementSibling.nextElementSibling.value,
        email: document.getElementById('parent2').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value,
        workAddress: document.getElementById('parent2').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value,
        workPhone: document.getElementById('parent2').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value
    }
    
    
    var childrenObjects =[]
    
    var childrenElements = document.querySelectorAll('.child')
    for (i=0; i<childrenElements.length; i++) {
        
        var boosterSeat
        if (childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.checked === true) {
            boosterSeat = 'Yes'
        } else {
            boosterSeat = 'No'
        }
        
        var child = {
            name: childrenElements[i].firstElementChild.nextElementSibling.value,
            gender: childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.value,
            dateOfBirth: childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value,
            currentSchool: childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value,
            teacherName: childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value,
            booster: boosterSeat,
            height: childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.value,
            weight: childrenElements[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.value     
        }
        
        childrenObjects.push(child)
    }
    
    var emergencyContact1 = {
        name: document.getElementById('emergency1').firstElementChild.nextElementSibling.value,
        relationship: document.getElementById('emergency1').firstElementChild.nextElementSibling.nextElementSibling.value,
        number: document.getElementById('emergency1').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value,
    }
    
    var emergencyContact2 = {
        name: document.getElementById('emergency2').firstElementChild.nextElementSibling.value,
        relationship: document.getElementById('emergency2').firstElementChild.nextElementSibling.nextElementSibling.value,
        number: document.getElementById('emergency2').firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value,
    }
    
    var additionalInfo = document.getElementById('comment').value
    
    
    const input = {
        paymentMethod: "PayPal",
        annualFeeIncluded: annualFeeIncluded,
        charge: charge,
        chargeAmountWithDecimal: chargeAmountWithDecimal,
        generalInfo: generalInfo,
        parentOne: parentOne,
        parentTwo: parentTwo,
        childrenObjects: childrenObjects,
        emergencyContact1: emergencyContact1,
        emergencyContact2: emergencyContact2,
        additionalInfo: additionalInfo  
        }
                    
        
        
        fetch("https://lilpeeps.herokuapp.com/sendEmailPayPal", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(input)
        })
            .then(response => {
                return response.json();
            })
        
            .then(output => {
           
            
            
            })
        document.getElementById('hiddenButton1').click()
    document.getElementById('hiddenButton2').click()
        document.getElementById('thankyou').style.display = 'block'
        

}

