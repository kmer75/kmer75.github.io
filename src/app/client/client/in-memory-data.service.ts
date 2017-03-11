import { Client } from './client';
import { Adresse } from './adresse';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let clients: Client[] = [
      {
        id: 1, nom: 'san', prenom: 'gohan', description: 'gohan ado',
        imgPath: 'http://img11.deviantart.net/b16f/i/2011/330/6/7/ssj2_gohan_preview_by_2d75-d4hfd5n.jpg',
        telephone: '0102030405', email: 'gohan@gmail.com', genre: 'male',
        adresse: {
    rue: "24 Rue de la Johardière",
    zipcode: "44800",
    ville: "Saint-Herblain",
    pays: "France",
    latitude: 47.22714149999999,
    longitude: -1.6509673000000475
  }
      },
      {
        id: 2, nom: 'san', prenom: 'goku', description: 'goku le hero',
        imgPath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS2C7lrY0Jjr3kyxUtYlHRdKcO9VJqvWf4JmpGg1u_rQzTYs_LW',
        telephone: '0102030405', email: 'goku@gmail.com', genre: 'male',
        adresse: {
    rue: "29 Avenue Jean Jaurès",
    zipcode: "75019",
    ville: "Paris",
    pays: "France",
    latitude: 48.88389129999999,
    longitude: 2.3735090999999784
  }
      },
      {
        id: 3, nom: 'futur', prenom: 'trunks', description: 'trunks du futur',
        imgPath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQLh3QE4k5u6oI3nPr9ly86IEVPap1wbG6K9UQdTumdXfQX2ee-hg',
        telephone: '0102030405', email: 'trunks@gmail.com', genre: 'male',
         adresse: {
    rue: "3 Promenade des Anglais",
    zipcode: "06200",
    ville: "Nice",
    pays: "France",
    latitude: 43.6952444,
    longitude: 7.265125000000012
  }
      },
      {
        id: 4, nom: 'prince sayen', prenom: 'vegeta', description: 'vegeta le prince des saiyen',
        imgPath: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcToboYwD93QvjWVylyhmnBHqcUXom4VhSbSA0LcF0xThL6LCMPH',
        telephone: '0102030405', email: 'vegeta@gmail.com', genre: 'male',
        adresse: {
    rue: "25 Rue de la Caravelle",
    zipcode: "31500",
    ville: "Toulouse",
    pays: "France",
    latitude: 43.6163245,
    longitude: 1.462073299999929
  }
      },
      {
        id: 5, nom: 'sayen legendaire', prenom: 'broly', description: 'broly le super saiyen legendaire',
        imgPath: 'http://www.dragonweb.fr/sites/default/files/broly/brolyssj.png',
        telephone: '0102030405', email: 'broly@gmail.com', genre: 'male',
        adresse: {
    rue: "2 Avenue des Champs-Élysées",
    zipcode: "75008",
    ville: "Paris-8E-Arrondissement",
    pays: "France",
    latitude: 48.8665906,
    longitude: 2.317465200000015
  }
      }

    ];
    return { clients };
  }

}
