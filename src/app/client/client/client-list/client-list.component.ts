import { Router } from '@angular/router';
import { ClientService } from './../client.service';
import {
  Component, OnInit, EventEmitter, Output, Input, OnChanges, trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { Client } from './../Client';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  host: { '[@routeAnimation]': 'true' },
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate('0.5s 1s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 200 ease-out', style({
          backgroundColor: '#eb6d6d',
          opacity: 0,
          transform: 'scale(0)'
        }))
      ])
    ]),
    trigger('routeAnimation', [
      state('void', style({ width: '100%', height: 0 })),
      state('*', style({ width: '100%' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)')
      ]),
      transition('* => void',
        animate(0, style({
          transform: 'translateY(100%)',
          opacity: 0
        }))
      )
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
