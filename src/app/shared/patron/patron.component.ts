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

    ngOnInit(): void {
        // console.log("Jqeuery here");
        // jQuery(this.elementRef.nativeElement).find('button').on('click', function () {
        //     alert('yes');
        // });
        // jQuery(this.elementRef.nativeElement).ready(function () {
        //     console.log('OnInit => ready function : oh le document est pret !!');
        // });
        // let data = this.getData();
        this.getData().subscribe(
            (success) => alert('success'),
            (fail) => alert('fail'),
            () => alert('complete')
        );
        // this.getData();

    }

    getData(): Observable<any> {
        let response = this.clientService.getClientsSubscribe().share();
        response.subscribe(
            (data) => { console.log('success') },
            (data) => { console.log('error  =>' + data) },
            () => { console.log('complete') }
        );
        return response;
    }

    ngAfterViewInit(): void {
        console.log('AfterViewInit : oh on est là !!');
        console.log(jQuery('#test'));
    }




}
