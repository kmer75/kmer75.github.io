import { Client } from './client';
import { Injectable, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


@Injectable()
export class ClientService implements OnInit {

  constructor(private http: Http) { }

  clientUrl: string = "api/clients";
  headers = new Headers({ 'Content-Type': 'application/json' });

  getClientsSubscribe() {
    return this.http.get("api/clients").map(data => data.json());
  }

  createSubscribe(client: Client) {
    return this.http
      .post(this.clientUrl, client, { headers: this.headers })
      .map(data => data.json());
  }

  getClients(): Promise<Client[]> {
    return this.http.get(this.clientUrl).toPromise().then(
      function (response) {
        console.log(response.json().data);
        return response.json().data as Client[];
      }
    ).catch(this.handleError);
  }

  getClient(id: number): Promise<Client> {
    return this.http.get("api/clients/" + id).toPromise().then(
      function (response) {
        console.log(response.json().data);
        return response.json().data as Client;
      }
    ).catch(this.handleError);
  }



  update(client: Client): Promise<Client> {
    const url = `${this.clientUrl}/${client.id}`;
    return this.http
      .put(url, JSON.stringify(client), { headers: this.headers })
      .toPromise()
      .then(() => client)
      .catch(this.handleError);
  }

  create(client: Client): Promise<Client> {
    return this.http
      .post(this.clientUrl, client, { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }


  save(client: Client): Promise<Client> {
    if (client.id) {
      return this.update(client);
    }
    return this.create(client);
  }

  delete(id: number): Promise<void> {
    console.log('id numero : ' + id);
    const url = `${this.clientUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => { console.log('client numero ' + id + ' supprime'); return null; })
      .catch(this.handleError);
  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  ngOnInit() {

  }

 


}


 /*
{
  getHeroes(): Promise<Hero[]> {
    return this.http
      .get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  save(hero: Hero): Promise<Hero> {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

  delete(hero: Hero): Promise<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  // Add new Hero
  private post(hero: Hero): Promise<Hero> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.heroesUrl, JSON.stringify(hero), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update existing Hero
  private put(hero: Hero): Promise<Hero> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .put(url, JSON.stringify(hero), { headers: headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  }
  */
