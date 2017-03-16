import { Directive, OnDestroy, OnInit,AfterViewInit, Input,ElementRef } from '@angular/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { GoogleMap, Marker } from 'angular2-google-maps/core/services/google-maps-types';
import { Observable } from 'rxjs';
import 'js-marker-clusterer/src/markerclusterer.js';

declare const google;
declare const MarkerClusterer;
declare var jQuery: any;

@Directive({
  selector: 'marker-cluster'
})
export class MarkerCluster implements OnInit {
elementRef: ElementRef;
  @Input() 
  points: any[]; 



  constructor(private gmapsApi: GoogleMapsAPIWrapper,elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

   ngAfterViewInit(): void {
        // console.log("Jqeuery here");
        // jQuery(this.elementRef.nativeElement).ready(function () {
        //     console.log('OnInit => ready function : oh le document est pret !!');
        // });

        
    }

  ngOnInit() {

    this.gmapsApi.getNativeMap().then(map => {

		
		let markerIcon = {
			url: "assets/marker.png", // url
			scaledSize: new google.maps.Size(35, 35)
		  }
		
		
      let style = {
        url: "assets/cluster.png",
        height: 40,
        width: 40,
        textColor: '#FFF', 
        textSize: 11,  
        backgroundPosition: "center center"
      }; 

		let options = {
		  imagePath: "/assets/cluster",
		  gridSize: 70,
		  styles: [style, style, style]
		};
		
		var infowindow = new google.maps.InfoWindow();
     var markers :any[] = [];
    var markerCluster : any;

      Observable
        .interval(500)
        .skipWhile((s) => this.points == null || this.points.length <= 0)
        .take(1)
        .subscribe(() => {if (markerCluster) {
          markerCluster.clearMarkers();
          markers = [];
        }
          if (this.points.length > 0) {
            for (let point of this.points) {
              let marker = new google.maps.Marker({
                position: new google.maps.LatLng(point.Latitude, point.Longitude),
                //icon : markerIcon,
                title: 'this is a title'
              });
               //evenement infowindow

             google.maps.event.addListener(marker, 'click', (function (marker) {
            return function () {

                var html = '';

                // Create a container for the infowindow content
                html += '<div class="infowindow-content">';

                
                // Add a title
                html += '<p >' + 'title' + '</p><br />';

                // Add a link
                html += '<p onclick="onClickInfo(3)">' + 'link' + '</p><br />';

                // Add an image
                html += '<p>' + 'image' + '</p>';

                // Close the container
                html += '</div>';

                infowindow.setContent(html);
                infowindow.open(map, marker);
            }
        })(marker));

             //fin infowindow
              markers.push(marker);
            }
          } else {
            markers = [];
            if (markerCluster) {
              markerCluster.clearMarkers();
            }
          }

          markerCluster = new MarkerClusterer(map, markers, 
          {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
          

          
        })
    });
  }

}
