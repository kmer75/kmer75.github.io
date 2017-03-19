import { Observable } from 'rxjs/Observable';
import { Animations } from './../animation';
import { ClientService } from './../../client/client/client.service';
import { Client } from './../../client/client/client';
import { Http, Response } from '@angular/http';
import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import 'rxjs/Rx';
declare var jQuery: any;

@Component({
    moduleId: module.id,
    selector: 'app-patron',
    templateUrl: './patron.component.html',
    styleUrls: ['./patron.component.css'],
    host: { '[@routeAnimation]': 'true' },
    animations: Animations.page
})
export class PatronComponent implements OnInit {
    title = "Patron Component";
    elementRef: ElementRef;
    constructor(elementRef: ElementRef, private http: Http, private clientService: ClientService) {
        this.elementRef = elementRef;
    }

    onStart($event) {
        // call this function at start of the animation.
        console.log('starting animation');
    }
    onDone($event) {
        // call this function at the end of the animation.
        console.log('the end of the animation');
    }

    data = [];

    client : Client = {
        "id": 1, "nom": "san", "prenom": "gohan", "description": "gohan ado",
        "imgPath": "http://img11.deviantart.net/b16f/i/2011/330/6/7/ssj2_gohan_preview_by_2d75-d4hfd5n.jpg",
        "telephone": "0102030405", "email": "gohan@gmail.com", "genre": "male",
        "adresse": {
    "rue": "24 Rue de la Johardière",
    "zipcode": "44800",
    "ville": "Saint-Herblain",
    "pays": "France",
    "latitude": 47.22714149999999,
    "longitude": -1.6509673000000475
  }
      };


    ngOnInit(): void {
        this.getClients();
        this.clientService.sendData(this.client).subscribe();
    }

    getClients(){
    this.clientService.getData().subscribe(
           (data:Response) => console.log(data) ,
            (data) => { alert('error'); console.log(data) }
        );
  }


    ngAfterViewInit(): void {
        console.log('AfterViewInit : oh on est là !!');
        console.log(jQuery('#test'));
    }




}
