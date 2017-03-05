import { ClientSearchService } from './client-search-service';
import { Client } from './../client';
import { Component, OnInit, OnChanges, trigger,
  state,
  style,
  transition,
  animate } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css'],
  providers: [ClientSearchService],
  animations: [
    trigger('testState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#fff',
        transform: 'scale(1.5)'
      })),
      transition('inactive <=> active', animate(300))
    ])
  ]
})
export class ClientDashboardComponent implements OnInit {
  state = "inactive";
  onClick(s) {
    this.state == "inactive" ? this.state = "active" : this.state = "inactive";
  }
  string = 'mickael';

  title: string = 'My first angular2-google-maps project';
  lat: number = 51.678418;
  lng: number = 7.809007;

  clients: Observable<Client[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private clientSearchService: ClientSearchService,
    private router: Router) { }

  search(term: string): void {
    // Push a search term into the observable stream.
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    //console.log(this.searchTerms.this.clientSearchService.search('san'));
    this.clients = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.clientSearchService.search(term)
        // or the observable of empty clientes if no search term
        : Observable.of<Client[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return Observable.of<Client[]>([]);
      });
  }

ngOnChanges(changes) {
    console.log(this.clients);
    }

  gotoDetail(client: Client): void {
    let link = ['/client/edit', client.id];
    this.router.navigate(link);
  }

}
