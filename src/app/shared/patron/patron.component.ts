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
    styleUrls: ['./patron.component.css']
})
export class PatronComponent implements OnInit {
    title = "Patron Component";
    elementRef: ElementRef;
    constructor(elementRef: ElementRef, private http: Http, private clientService: ClientService) {
        this.elementRef = elementRef;
    }

    ngOnInit(): void {
        console.log("Jqeuery here");
        jQuery(this.elementRef.nativeElement).find('button').on('click', function () {
            alert('yes');
        });
        jQuery(this.elementRef.nativeElement).ready(function () {
            console.log('OnInit => ready function : oh le document est pret !!');
        });


    }

    getData(): void {
        this.clientService.getClientsSubscribe().subscribe((data) => console.log(data));
    }

    ngAfterViewInit(): void {
        console.log('AfterViewInit : oh on est là !!');
        console.log(jQuery('#test'));
        this.getData();
    }





}
