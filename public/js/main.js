// function displaySensors() {
    //     let Ref = firebase.database().ref('Sensor/');
    //     Ref.once('value').then(function(snapshot) {
    //         var info = snapshot.val();
    //         console.log(info);
    //         console.log(info.one);
    //         console.log(Object.keys(info));
    //         var query = firebase.database().ref("Sensor/").orderByKey();
    //         query.once("value").then(function(snapshot) {
    //             snapshot.forEach(function(childSnapshot) {
    //                 let childData = childSnapshot.val();
    //                 let distance = childData.distance;

    //                 let location = geocodeMap(childData.location);
    //                 let marker = new createMarker(map, location, false);

    //                 var info = '<div>' + distance + '</div>';
    //                 var infowindow = new google.maps.InfoWindow({
    //                     content: info
    //                 });

    //                 marker.addListener('click', function() {
    //                     infowindow.open(map, marker);
    //                 });

    //                 console.log(childData, childData.location, location);
    //             });
    //         });
    //     });

    // }
