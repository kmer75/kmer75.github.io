import { Observable } from 'rxjs/Observable';
import { Animations } from './../animation';
import { ClientService } from './../../client/client/client.service';
import { Client } from './../../client/client/client';
import { Http } from '@angular/http';
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

    ngOnInit(): void {
        this.getClients();
    }

    getClients(): Observable<any> {
    let response = this.clientService.getClients().share();
    response.subscribe(
           (data) => { this.data= data },
            (data) => { alert('error') }
        );
        return response;
  }


    ngAfterViewInit(): void {
        console.log('AfterViewInit : oh on est là !!');
        console.log(jQuery('#test'));
    }




}
