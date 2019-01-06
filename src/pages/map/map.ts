import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar') searchBar: ElementRef;
  map: any;
  positionSubscription: Subscription;
  autocompleteService: any;
  placesService: any;
  places: any = [];
  location: any; 
  query: any;
  mapStyle = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6195a0"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": "0"
            },
            {
                "saturation": "0"
            },
            {
                "color": "#f5f5f2"
            },
            {
                "gamma": "1"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "-3"
            },
            {
                "gamma": "1.00"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#bae5ce"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fac9a9"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#4e4e4e"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#787878"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "labels.icon",
        "stylers": [
            {
                "hue": "#0a00ff"
            },
            {
                "saturation": "-77"
            },
            {
                "gamma": "0.57"
            },
            {
                "lightness": "0"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#43321e"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.icon",
        "stylers": [
            {
                "hue": "#ff6c00"
            },
            {
                "lightness": "4"
            },
            {
                "gamma": "0.75"
            },
            {
                "saturation": "-68"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#eaf6f8"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c7eced"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "-49"
            },
            {
                "saturation": "-53"
            },
            {
                "gamma": "0.79"
            }
        ]
    }
];
    
  marker: any;
  address_1: any;
  address_2: any;
  latLng: any = {
      lat: '',
      lng: ''
  };
    
  constructor(public navCtrl: NavController, public navParams: NavParams, private plt: Platform,public zone: NgZone, private geolocation: Geolocation, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.plt.ready().then(()=>{
        let mapOptions = {
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: this.mapStyle,
            mapTypeControl: false,
            streetViewControl: false
        };
        console.log(this.searchBar);
        
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        
        this.autocompleteService = new google.maps.places.AutocompleteService();
        
        let autocomplete = new google.maps.places.Autocomplete(this.searchBar.nativeElement);
            console.log(autocomplete);
            autocomplete.addListener('place_changed', ()=>{
                console.log('listening');
            this.zone.run(() => {
              let place = autocomplete.getPlace();
              if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                console.log('error');
                return;
              }
              this.map.setCenter(place.geometry.location);
              this.map.setZoom(15);
              this.latLng.lat = place.geometry.location.lat();
              this.latLng.lng = place.geometry.location.lng(); 
              console.log(place);
              this.location = place.formatted_address;
                console.log(this.location);
            });
            
        });
        
        
        this.marker = new google.maps.Marker({
                map: this.map,
                position: {lat: -25.363, lng: 131.044},
                draggable:true
            });
        
        
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.addDragEvent();
        this.addClickEvent();
        

        
        this.geolocation.getCurrentPosition().then(pos => {
            
            console.log(pos);
            let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            this.getPlacedetail(pos.coords.latitude, pos.coords.longitude);
            this.latLng.lat = pos.coords.latitude;
            this.latLng.lng = pos.coords.longitude; 
            this.map.setCenter(latLng);
            this.map.setZoom(15);
            this.marker.setMap(null);
            this.marker = new google.maps.Marker({
                map: this.map,
                position: latLng,
                draggable:true
            });
            
            this.addDragEvent();
            this.addClickEvent();
            let autocomplete = new google.maps.places.Autocomplete(this.searchBar.nativeElement);
            console.log(autocomplete);
            autocomplete.addListener('place_changed', ()=>{
                console.log('listening');
            this.zone.run(() => {
              let place = autocomplete.getPlace();
              if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                console.log('error');
                return;
              }
              this.map.setCenter(place.geometry.location);
              this.map.setZoom(15);
              this.marker.setPosition(place.geometry.location);
              this.latLng.lat = place.geometry.location.lat();
              this.latLng.lng = place.geometry.location.lng(); 
              console.log(place);
              this.location = place.formatted_address;
                console.log(this.location);
            });
            
        });
        })
        .catch(err => console.log(err));
        ;
    })
  }
    
    addDragEvent(){
        google.maps.event.addListener(
                this.marker,
                'dragend',
                (evt)=> {
                    this.zone.run(() => {
                    console.log(evt);
                    this.getPlacedetail(evt.latLng.lat(), evt.latLng.lng());
                    });
                }
            );
    }
    
    addClickEvent(){
        google.maps.event.addListener(
                this.map,
                'click',
                (evt)=> {
                    this.zone.run(() => {
                    console.log(evt);
                    let latLng = new google.maps.LatLng(evt.latLng.lat(), evt.latLng.lng());
                    this.marker.setMap(null);
                    //Create a marker and placed it on the map.
                    this.marker = new google.maps.Marker({
                        position: latLng,
                        map: this.map,
                        draggable:true
                    });
                    this.getPlacedetail(evt.latLng.lat(), evt.latLng.lng());
                    
                    this.addDragEvent();
                    });
                }
            );
    }
    
    getPlacedetail(lat,long){
        console.log(lat);
        let geocoder = new google.maps.Geocoder;
        this.latLng.lat = lat;
        this.latLng.lng = long; 
        let latlng2 = {lat: parseFloat(lat), lng: parseFloat(long)};

        geocoder.geocode({'location': latlng2}, (results, status)=>{
            this.zone.run(() => {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                this.location = results[1].formatted_address;
                console.log(this.location);
              } else {
                console.log(results);
              }
            } else {
              console.log('Geocoder failed due to: ' + status);
            }
            });
          });
    }
    
    dismiss() {
        let data = {
            'location': this.location,
            'address_1': this.address_1,
            'address_2': this.address_2,
            'latLng': this.latLng
        }
        this.viewCtrl.dismiss(data);
    }
}
