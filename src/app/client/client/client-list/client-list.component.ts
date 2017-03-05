import { Router } from '@angular/router';
import { ClientService } from './../client.service';
import { Component, OnInit, EventEmitter, Output, Input, OnChanges, trigger,
  state,
  style,
  transition,
  animate } from '@angular/core';
import { Client } from './../Client';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  animations: [
  trigger('flyInOut', [
    state('in', style({opacity: 1, transform: 'translateX(0)'})),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate('0.2s ease-in')
    ]),
    transition('* => void', [
      animate('0.2s 10 ease-out', style({
        opacity: 0,
        transform: 'translateX(100%)'
      }))
    ])
  ])
]
})
export class ClientListComponent implements OnInit, OnChanges {

  constructor(private clientService: ClientService, private router: Router) { }



  clients: Client[] = [];
  @Output() event = new EventEmitter();
  selectedClient: Client;

  onSelect(c: Client) {
    console.log('on select un client parmi ma liste');
    console.log(c);
    this.selectedClient = c;
    this.event.emit(c);

  }

  onAdd() {
    this.router.navigate(['/client/add']);
  }

  getClients(): void {
    this.clientService.getClients().then(data => this.clients = data);
  }

  @Input() clientToDelete: Client = null;

  ngOnChanges(changes) {
    if (changes.clientToDelete && this.clientToDelete != null) {
      console.log('changement variable client to delete');
      console.log(this.clientToDelete);
      this.deleteClient(this.clientToDelete);
      this.clientToDelete = null;
    }

  }

  deleteClient(client: Client) {

    console.log('client venant de eventEmittter :')
    console.log(client);
    this.clients = this.clients.filter(c => c != client);

  }



  ngOnInit() {
    this.getClients();
  }

}
