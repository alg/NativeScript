﻿// <snippet name="location">
// # Location
// Using the location requires the Location module.
// ``` JavaScript
//var LocationManager = require("location").LocationManager;
// ```
// </snippet>

import TKUnit = require("Tests/TKUnit");
import locationModule = require("location/location");
import types = require("location/location-types");

var LocationManager = locationModule.LocationManager;
var Location = locationModule.Location;

// <snippet name="location">
// ## Other functions
// </snippet>

export var testIsEnabled = function () {
    // <snippet name="location">
    // ### Test are location services available for this device
    // ``` JavaScript
    var isEnabled = LocationManager.isEnabled();
    // ```
    // </snippet>
    TKUnit.assert(isEnabled);
};

export var testDistance = function () {
    // <snippet name="location">
    // ### Get distance between two locations
    // ``` JavaScript
    //var Location = require("location").Location;
    var locSofia = new Location();
    locSofia.longitude = 42.696552;
    locSofia.latitude = 23.32601;
    var locNewYork = new Location();
    locNewYork.longitude = 40.71448;
    locNewYork.latitude = -74.00598;
    var distance = LocationManager.distance(locSofia, locNewYork);
    // ```
    // </snippet>
    TKUnit.assert((distance > 10780000) && (distance < 10860000), "invalid distance " + distance);
};

// <snippet name="location">
// ## Getting location
// </snippet>

export var testLocation = function () {
    var locationReceived;

    // <snippet name="location">
    // ### Receive continuous location updates
    // ``` JavaScript
    var locationManager = new LocationManager();

    locationManager.startLocationMonitoring(function(location) {
            //console.log('Location received: ' + location);
            // <hide>
            locationReceived = true;
            // </hide>
        }, function(error) {
            //console.log('Location error received: ' + error);
            // <hide>
            locationReceived = error;
            // </hide>
        }
    );

    // ```
    // </snippet>
    var isReady = function () {
        return locationReceived;
    }

    TKUnit.waitUntilReady(isReady, 10);

    locationManager.stopLocationMonitoring();

    TKUnit.assert(true === locationReceived, locationReceived);
};

export var testLastKnownLocation = function () {
    TKUnit.waitUntilReady(function () { return false; }, 1); // give it some time after the last test
    // <snippet name="location">
    // ### Get last known location
    // ``` JavaScript
    var locationManager = new LocationManager();
    var lastKnownLocation = locationManager.lastKnownLocation;
    // ```
    // </snippet>
    TKUnit.assert((lastKnownLocation != null), "There is no last known location");
};

function doOnce(options: locationModule.Options) {
    var locationReceived;
    // <snippet name="location">
    // ### Get location once
    // if there is `options.timeout` you will receive error on timeout. If `options.timeout` is 0 then the result is the same as the result from `LocationManager.lastKnownLocation`
    // and there will be no wait. You can use `options.maximumAge` to specify you don't want to receive locations older than specified time in ms.
    //
    // ``` JavaScript
    // var locationModule = require("location");
    //// options can also look like { maximumAge: 2000, timeout: 20 }
    // locationModule.getLocation({ maximumAge: 30000, timeout: 0 }).then(function (location) {
    //      console.log('Location received: ' + location);
    // <hide>
    locationModule.getLocation(options).then(function (location) {
        locationReceived = true;
        // </hide>
    }).fail(function (error) {
        //console.log('Location error received: ' + error);
        // <hide>
        locationReceived = error;
        // </hide>
    });
    // ```
    // </snippet>

    var isReady = function () {
        return locationReceived;
    }

    TKUnit.waitUntilReady(isReady, 10);

    TKUnit.assert(true === locationReceived, locationReceived);
}

export var testLocationOnce = function () {
    doOnce(undefined);
};

export var testLocationOnceTimeout0 = function () {
    doOnce({timeout: 0});
};

export var testLocationOnceMaximumAge = function () {
    TKUnit.waitUntilReady(function () { return false; }, 2);
    doOnce({ maximumAge: 3000, timeout: 0 }); // this should pass
    try {
        doOnce({ maximumAge: 1000, timeout: 0 });
        TKUnit.assert(false, "maximumAge check failed");
    }
    catch (e) {
    }
};

export var testLocationOnceTimeout1000 = function () {
    doOnce({ timeout: 1000 });
};

export var testSnippet = function () {
    var locationReceived;
    // <snippet name="location">
    // ### Get location once
    // if there is `options.timeout` you will receive error on timeout. If `options.timeout` is 0 then the result is the same as the result from `LocationManager.lastKnownLocation`
    // and there will be no wait. You can use `options.maximumAge` to specify you don't want to receive locations older than specified time in ms.
    //
    // ``` JavaScript
    // var locationModule = require("location");
    //// options can also look like { maximumAge: 2000, timeout: 20 }
    locationModule.getLocation({ maximumAge: 30000, timeout: 0 }).then(function (location) {
        //console.log('Location received: ' + location);
        // <hide>
        locationReceived = true;
        // </hide>
    }).fail(function (error) {
        //console.log('Location error received: ' + error);
        // <hide>
        locationReceived = error;
        // </hide>
    });
    // ```
    // </snippet>

    var isReady = function () {
        return locationReceived;
    }

    TKUnit.waitUntilReady(isReady, 10);
};

