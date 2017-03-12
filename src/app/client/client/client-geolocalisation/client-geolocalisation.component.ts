import { Component, OnInit } from '@angular/core';
import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';
import { ClientService } from './../client.service';
import { Router } from '@angular/router';
import { Client } from './../Client';

@Component({
  selector: 'app-client-geolocalisation',
  templateUrl: './client-geolocalisation.component.html',
  styleUrls: ['./client-geolocalisation.component.css']
})
export class ClientGeolocalisationComponent implements OnInit {

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    this.getClients();
  }

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
  
  getMarkers (clients): void {
    
    clients.forEach(client => {
      this.markers.push({
		  lat: client.adresse.latitude,
		  lng: client.adresse.longitude,
		  label: client.prenom[0],
		  draggable: false
	  });
    });
  }

  markers: marker[] = [];
  // = [
	//   {
	// 	  lat: 51.673858,
	// 	  lng: 7.815982,
	// 	  label: 'A',
	// 	  draggable: true
	//   },
	//   {
	// 	  lat: 51.373858,
	// 	  lng: 7.215982,
	// 	  label: 'B',
	// 	  draggable: false
	//   },
	//   {
	// 	  lat: 51.723858,
	// 	  lng: 7.895982,
	// 	  label: 'C',
	// 	  draggable: true
	//   }
  // ]



}



// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}