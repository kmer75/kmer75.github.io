import { ClientService } from './../client.service';
import { Client } from './../client';
import { Component, OnInit, Input, EventEmitter, Output, trigger,
  state,
  style,
  transition,
  animate } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Router } from "@angular/router";


@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css'],
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
        transform: 'translateY(100%)'
      }))
    ])
  ])
]
})
export class ClientDetailComponent implements OnInit {

  constructor(private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router) { }
  lat: number = 51.678418;
  lng: number = 7.809007;

  client: Client;
  identifiant: number;

  getClient() {

  }

  @Input() clientDetail: Client = null;

  ngOnInit() {
    //   this.route.params
    //   .switchMap((params : any) => {
    //   var client = this.clientService.getClient(params['id']);
    //   this.identifiant = params['id'];
    //   console.log(client);
    //   return client;
    // })
    // .subscribe(client => this.client = client as Client);

    //   console.log(this.identifiant);

  }

  @Output() eventDeletedClient = new EventEmitter<Client>();

  onEdit(client: Client) {

    this.router.navigate(['/client/edit', client.id]);

  }

  onDelete(client: Client) {
    this.clientService.delete(client.id)
      .then(() => {
        this.clientDetail = null;
        this.eventDeletedClient.emit(client);
        console.log('client ds la methode success du delete (then) :');
        console.log(client)
      });
  }


  // delete(hero: Hero): void {
  //   this.heroService
  //       .delete(hero.id)
  //       .then(() => {
  //         this.heroes = this.heroes.filter(h => h !== hero);
  //         if (this.selectedHero === hero) { this.selectedHero = null; }
  //       });
  // }


}
