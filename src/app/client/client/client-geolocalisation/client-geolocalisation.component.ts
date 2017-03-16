import { Component, OnInit, OnChanges, ElementRef } from '@angular/core';
import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';
import { ClientService } from './../client.service';
import { Router } from '@angular/router';
import { Client } from './../Client';
import { points } from './points';
declare var jQuery: any;

@Component({
  selector: 'app-client-geolocalisation',
  templateUrl: './client-geolocalisation.component.html',
  styleUrls: ['./client-geolocalisation.component.css']
})
export class ClientGeolocalisationComponent implements OnInit {
elementRef: ElementRef;
clientID: string = '0';
  constructor(elementRef: ElementRef,private clientService: ClientService, private router: Router) { this.elementRef = elementRef;}

  ngOnInit() {
    
    this.points = points;
    this.getClients();
    jQuery(this.elementRef.nativeElement).ready(function () {
            console.log('OnInit => ready function : oh le document est pret !!');
            console.log(jQuery('#clientID').val());
            
        });

        jQuery('#clientID').on("change", function() {
        alert(jQuery(this).val()); 
});
             
  }

  onSubmit(form) {
    console.log(form);
  }

  
  ngOnChanges(changes) {
    if (changes.clientID) {
      console.log('changement clientID : '+this.clientID);
    }
  }

  points: any[] = [];

  clients: Client[] = [];
  getClients(): void {
    this.clientService.getClients().then(data => {
      this.clients = data;
      this.getMarkers(data)
    });
  }

  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng
  //   });
  // }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  getMarkers(clients): void {

    clients.forEach(client => {
      this.markers.push({
        lat: client.adresse.latitude,
        lng: client.adresse.longitude,
        label: client.prenom[0],
        draggable: false,
        nom: client.nom + ' ' + client.prenom
      });
    });
  }

  markers: marker[] = [];

}



// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  nom: string;
}