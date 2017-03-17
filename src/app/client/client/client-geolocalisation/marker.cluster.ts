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
    }

  ngOnInit() {

    this.gmapsApi.getNativeMap().then(map => {

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
                position: new google.maps.LatLng(point.adresse.latitude, point.adresse.longitude),
                //icon : markerIcon,
                title: 'cliquer pour avoir le détail de '+point.prenom
              });

              marker.addListener('mouseover', function() {
                
                 var html = '';
                html += '<div class="row">';
                html += '<p class="col-xs-6">' + point.nom +' ' + point.prenom + '</p>';
                html += '<img class="col-xs-6" style="width:100px" src="' + point.imgPath + '"/>';
                html += '</div>';

                infowindow.setContent(html);
                infowindow.open(map, marker);
              });
              marker.addListener('mouseout', function() {
                infowindow.close(map, marker);
              });
              marker.addListener('click', function() {
                alert('id =>' +point.id + ' ' + 'detail => '+point.description);
              });
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
