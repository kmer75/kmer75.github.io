import { Component, OnInit } from '@angular/core';
import { Client } from './client';

@Component({
  moduleId: module.id,
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor() { }

  client: Client;

  selectedClient: Client;

  ngOnInit() {
  }

  assignDeletedClient(client: Client) {
    this.selectedClient = client;
    console.log('assign');
    console.log(this.selectedClient);
  }

}
