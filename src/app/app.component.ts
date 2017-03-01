import { Component, ElementRef, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

     ngOnInit(): void {
        // console.log("App on init");
        // jQuery(this.elementRef.nativeElement).ready(function () {
        //      jQuery(".page-header .menu-toggler").on("click", function(event) {
            
        // });
        // });

    }
}
