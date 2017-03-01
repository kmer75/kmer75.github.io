import { Client } from './client';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let clients: Client[] = [
      {
        id: 1, nom: 'san', prenom: 'gohan', description: 'gohan ado',
        imgPath: 'http://img11.deviantart.net/b16f/i/2011/330/6/7/ssj2_gohan_preview_by_2d75-d4hfd5n.jpg',
        rue: 'rue', zipcode: 'zipcode', ville: 'ville',
        pays: 'pays', telephone: 'telephone', email: 'email', genre: 'male'
      },
      {
        id: 2, nom: 'san', prenom: 'goku', description: 'goku le hero',
        imgPath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS2C7lrY0Jjr3kyxUtYlHRdKcO9VJqvWf4JmpGg1u_rQzTYs_LW',
        rue: 'rue', zipcode: 'zipcode', ville: 'ville',
        pays: 'pays', telephone: 'telephone', email: 'email', genre: 'male'
      },
      {
        id: 3, nom: '', prenom: 'trunks', description: 'trunks du futur',
        imgPath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQLh3QE4k5u6oI3nPr9ly86IEVPap1wbG6K9UQdTumdXfQX2ee-hg',
        rue: 'rue', zipcode: 'zipcode', ville: 'ville',
        pays: 'pays', telephone: 'telephone', email: 'email', genre: 'male'
      },
      {
        id: 4, nom: '', prenom: 'vegeta', description: 'vegeta le prince des saiyen',
        imgPath: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcToboYwD93QvjWVylyhmnBHqcUXom4VhSbSA0LcF0xThL6LCMPH',
        rue: 'rue', zipcode: 'zipcode', ville: 'ville',
        pays: 'pays', telephone: 'telephone', email: 'email', genre: 'male'
      },
      {
        id: 5, nom: '', prenom: 'broly', description: 'broly le super saiyen legendaire',
        imgPath: 'http://www.dragonweb.fr/sites/default/files/broly/brolyssj.png',
        rue: 'rue', zipcode: 'zipcode', ville: 'ville',
        pays: 'pays', telephone: 'telephone', email: 'email', genre: 'male'
      }

    ];
    return { clients };
  }

}
