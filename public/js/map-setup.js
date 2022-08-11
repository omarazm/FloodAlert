Date.prototype.monthNames = [
  "January", "February", "March",
  "April", "May", "June",
  "July", "August", "September",
  "October", "November", "December"
];
Date.prototype.getMonthName = function() {
  return this.monthNames[this.getMonth()];
};
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

var map, infoWindow, marker, rainMark, typeText, iconType, viewIconType, Type;

function geocodeMap(address) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
      'address': address
    },
    function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results[0].geometry.location.lat());
        console.log(results[0].geometry.location.lng());
        google.maps.event.trigger(map, 'resize');
        map.setCenter(results[0].geometry.location);
      }
    });

}

//Sets up google map
function modalMap(id, zoom, address, img, drag) {
  let map = new google.maps.Map(id, {
    'zoom': zoom
  });
  new google.maps.Marker({
    position: address,
    map: map,
    icon: img,
    draggable: drag,
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }]
      }
    ]
  });
  map.setCenter(address);
}

//Finds coordinates of location
function coords(location) {
  return {
    lat: location.coords.latitude,
    latitude: location.coords.latitude,
    lng: location.coords.longitude,
    longitude: location.coords.longitude
  }
}

//Creates a marker for the user
function createMarker(map, location, draggable) {
  return new google.maps.Marker({
    'map': map,
    position: location,
    draggable: !!draggable
  });
}

//Adds a flood marker
function addRain() {
  rainMark = new modal('r');
}

//Adds a help marker
function addHelp() {
  rainMark = new modal('h');
}

//Adds a shelter marker
function addShelter() {
  rainMark = new modal('s');
}

//Adds created marker on the map
class modal {
  constructor(pinType) {
    let self = this;

    //Checks if marker is of type flood
    if (pinType === 'r') {
      //Sets attributes of flood marker
      typeText = 'Flooded Street';
      iconType = {
        url: 'img/highlighted-flood.svg',
        scaledSize: new google.maps.Size(39.341, 50),
      };
      Type = 1;
      console.log(Type);
    }
    //Checks if marker is of type shelter
    else if (pinType === 's') {
      //Sets attributes of shelter marker
      typeText = 'Shelter Location';
      iconType = {
        url: 'img/highlighted-shelter.svg',
        scaledSize: new google.maps.Size(39.341, 50),
      };
      Type = 2;
      console.log(Type);
    }
    //Checks if marker is of type help
    else if (pinType === 'h') {
      //Sets attributes of help marker
      typeText = 'Help Me!';
      iconType = {
        url: 'img/highlighted-help.svg',
        scaledSize: new google.maps.Size(39.341, 50),
      };
      Type = 3;
      console.log(Type);
    }

    let location = map.getCenter();

    //Creates marker of a specific type
    marker = createMarker(map, location, true);
    marker.setIcon(iconType);

    //Sets location of marker
    let addMarker = marker.getPosition();

    //Provides option for user to submit marker at the specified location
    marker.addListener('click', function() {
      self.openModal(addMarker);
    });
  }

  //Creates prompt/modal for user to submit marker
  openModal(addMarker) {

    try {
      // Puts Profile Picture and Name
      this.ProfileName = document.getElementById('SubmitMarker-content-person-Name');
      this.ProfileName.textContent = user.displayName;
      var ProfilePic;
      ProfilePic = document.getElementById('SubmitMarker-content-person-Pic');
      ProfilePic.style.backgroundImage = 'url(' + user.photoURL + ')';

      // Changes Modal Title
      $("#exampleModalLabel").text(typeText);

      // Opens Modal
      $("#exampleModal").modal('show');

      //Submits marker
      let self = this;
      let locate = addMarker;
      let add = document.getElementById('addmap');
      $('#exampleModal').on('shown.bs.modal', function() {
        let map;
        modalMap(add, 20, locate, iconType, true);
        let finalMarker = marker;
        $('#submit').click(function() {
          self.submit(finalMarker);
          $("#exampleModal").modal('hide');
        });
      });
    }
    catch(TypeError)
    {
      //var $login = $('#login');

      //$login.on('click touchstart', function() {
        //var provider = new firebase.auth.GoogleAuthProvider();
      //  firebase.auth().signInWithPopup(provider);
      //});

      //Open log in authorization with google
    }
  }
  submit(finalMarker) {
    // Adds Firebase functionality

    let ref = firebase.database(),
      marker = finalMarker,
      coords = marker.getPosition().toJSON(),
      name = user.displayName,
      email = user.email,
      imageUrl = user.photoURL,
      contentComment = document.getElementById('addMarker-comment').value,
      date = new Date(),
      type = Type,
      today = date.getMonthName() + ' ' + date.getDate() + ', ' + date.getFullYear() + ', ' + formatAMPM(date);

    ref.ref('/Pins/').push({
      username: name,
      email: email,
      profile_picture: imageUrl,
      position: coords,
      comment: contentComment,
      date: today,
      marker_type: type,
    });
  }
}

//Displays submitted pins/markers on the google map
function displayMarker() {
  // Connects to the correct Node in the Firebase Database
  let Ref = firebase.database().ref('Pins/');
  Ref.on('value', function(snapshot) {
    let coords = snapshot.val();

    // This puts all the information in variables that will be easily passed into their respective places
    Object.keys(coords).forEach(function(key) {
      let coord = coords[key],
        Lat = coord.position.lat,
        Lng = coord.position.lng,
        address = { lat: Lat, lng: Lng },
        picture = coord.profile_picture,
        name = coord.username,
        comment = coord.comment,
        type = coord.marker_type,
        date = coord.date;

      let title;

      //Sets the pin to be a flood icon
      if (type === 1) {
        title = "Flooded Street";
        viewIconType = {
          url: 'img/flood.svg',
          scaledSize: new google.maps.Size(39.341, 50),
        };
      }
      //Sets the pin to be a shelter icon
      else if (type === 2) {
        title = "Shelter";
        viewIconType = {
          url: 'img/shelter.svg',
          scaledSize: new google.maps.Size(39.341, 50),
        };
      }
      //Sets the pin to be a help icon
      else if (type === 3) {
        title = "Help!";
        viewIconType = {
          url: 'img/help.svg',
          scaledSize: new google.maps.Size(39.341, 50),
        };
      }

      // Adds a marker at the location from the data
      let marker = new createMarker(map, address, false);
      marker.setIcon(viewIconType);
      // console.log(viewIconType);

      // Enable the popup
      marker.addListener('click', function() {
        // Add Correct Modal Title
        document.getElementById('ViewMarker-Title').innerHTML = title;
        // Shows a comment if there is one
        document.getElementById('ViewMarker-comment').innerHTML = comment;
        // Shows a Date
        document.getElementById('ViewMarker-date').innerHTML = date;
        // Add User Name
        document.getElementById('ViewMarker-Name').innerHTML = name;
        // Add User Profile picture
        document.getElementById('ViewMarker-Pic').style.backgroundImage = 'url(' + picture + ')';

        // console.log(date);
        // Shows the popup
        $('#Viewmarker').modal('show');
        $('#Viewmarker').on('shown.bs.modal', function() {
          let Lat = marker.getPosition().lat(),
            Lng = marker.getPosition().lng(),
            center = {
              lat: Lat,
              lng: Lng,
            },
            add = document.getElementById('viewmap');

          modalMap(add, 20, center, viewIconType, false);
          $('#close').on('click', function() {
            $('#Viewmarker').modal('hide');
          });
        });
      });
    });

  })
}

//displays sensors
function displaySensors() {
  let Ref = firebase.database().ref('Sensor/');
  Ref.once('value').then(function(snapshot) {
    let info = snapshot.val();
    console.log(info);
    let infoKey = Object.keys(info);
    var node = infoKey[0];
    console.log(node);

    Object.keys(info).forEach(function(key) {
      let data = info[key],
        location = data.location;

      var distance, position, percent;

      let ref = firebase.database().ref('Sensor/' + node + '/distance/');
      ref.once('value').then(function(snapshot) {
        let info = snapshot.val();
        let distances = Object.values(info);
        distance = distances[distances.length - 1];
        console.log(distance);
      });

      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': location }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          position = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };
          console.log(position);
          var marker = createMarker(map, position, false);
          viewIconType = {
            url: 'img/sensor.svg',
            scaledSize: new google.maps.Size(39.341, 50),
          };
          marker.setIcon(viewIconType)

          marker.addListener('click', function() {
            $('#Sensor').modal('show');
            $('#Sensor').on('shown.bs.modal', function() {
              let add = document.getElementById('sensormap');
              modalMap(add, 20, position, viewIconType, false);

              percent = 100 * ((120 - distance) / 120);
              document.getElementById('progress-bar').style.width = percent + "%";

              $('#close').on('click', function() {
                $('#Sensor').modal('hide');
              });
            });
          });
        }
      });


    });
  });
}

//Searches for location on google map
function searchBar() {
  let place = document.getElementById('placeFinder').value;
  geocodeMap(place);
}

//Start instruction
function startInstruction(){
  $('#addMarkerInstruction').modal('show');
}
//Open highlighted marker modal
function highlightedMarkerInstruction(){
  $('#highlightedMarkerInstruction').modal('show');
}
//Open registered marker modal
function registeredMarkerInstruction(){
  $('#registeredMarkerInstruction').modal('show');
}

//Provides the user with tip pop us to help them
function viewHelp() {
  document.getElementById("help").disabled = true;

  console.log("Test");

  $('#testDropdownMenuButton').tooltip('enable');
  $('#dropdownFlood').tooltip('enable');

  if(document.getElementById("testDropdownMenuButton").clicked === true)
  {
    $('#dropdownFlood').tooltip('show');
  }

  setTimeout(function(){
    $('#testDropdownMenuButton').tooltip('hide');
    $('#testDropdownMenuButton').tooltip('disable');
    $('#dropdownFlood').tooltip('hide');
    $('#dropdownFlood').tooltip('disable');
  }, 10000);

  //document.getElementById("help").disabled = false;
}

function noHelp() {
  console.log("Test");

  document.getElementById("help").setAttribute("disabled","disabled");
}

function disableHelp(){
  $('#testDropdownMenuButton').tooltip('toggleEnabled');
}

displayMarker();
displaySensors();
disableHelp();
