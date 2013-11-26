Ext.define("SSC.view.CampaignsMap", {
    extend: 'Ext.Component',
    xtype: 'campaignsmap',

    html: ['<div class="gmap"></div>'],

    renderSelectors: {
        mapContainer: 'div'
    },

    listeners: {
        afterrender: function (comp) {
            var map,
                mapDiv = comp.mapContainer.dom;

            if (navigator && navigator.onLine) {
                try {
                    map = comp.initMap(mapDiv);
                    comp.addCampaignsOnTheMap(map);
                } catch (e) {
                    this.displayGoogleMapError();
                }
            } else {
                this.displayGoogleMapError();
            }
        }
    },

    initMap: function (mapDiv) {
        // latitude = 39.8097343 longitude = -98.55561990000001
        // Lebanon, KS 66952, USA Geographic center of the contiguous United States
        // the center point of the map
        var latMapCenter = 39.8097343,
            lonMapCenter = -98.55561990000001;

        var mapOptions = {
            zoom     : 3,
            center   : new google.maps.LatLng(latMapCenter, lonMapCenter),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {
                style   : google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                position: google.maps.ControlPosition.TOP_RIGHT
            }
        };

        return new google.maps.Map(mapDiv, mapOptions);
    },

    addCampaignsOnTheMap: function (map) {
        var marker,
            infowindow = new google.maps.InfoWindow(),
            geocoder   = new google.maps.Geocoder(),
            campaigns  = Ext.StoreMgr.get('Campaigns');

        campaigns.each(function (campaign) {
            var title       = campaign.get('title'),
                location    = campaign.get('location'),
                description = campaign.get('description');

            geocoder.geocode({
                address: location,
                country: 'USA'
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    // getting coordinates
                    var lat = results[0].geometry.location.lat(),
                        lon = results[0].geometry.location.lng();

                    // create marker
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(lat, lon),
                        map     : map,
                        title   : location
                    });

                    // adding click event to the marker to show info-bubble with data from json
                    google.maps.event.addListener(marker, 'click', (function(marker) {
                        return function () {
                            var content = Ext.String.format(
                                '<p class="infowindow"><b>{0}</b><br/>{1}<br/><i>{2}</i></p>',
                                title, description, location);

                            infowindow.setContent(content);
                            infowindow.open(map, marker);
                        };
                    })(marker));
                } else {
                    console.error('Error getting location data for address: ' + location);
                }
            });
        });
    },

    displayGoogleMapError: function () {
        console.log('Error is successfully handled while rendering Google map');
        this.mapContainer.update('<p class="error">Sorry, Google Map service isn\'t available</p>');
    }
});