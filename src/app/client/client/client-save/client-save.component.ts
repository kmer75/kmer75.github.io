import { Router } from '@angular/router';
import { ClientService } from './../client.service';
import { Client } from './../Client';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
declare var jQuery: any;

@Component({
  selector: 'app-client-save',
  templateUrl: './client-save.component.html',
  styleUrls: ['./client-save.component.css']
})
export class ClientSaveComponent implements OnInit, AfterViewInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  autocomplete: any = null;
  

  isEdit: boolean = false;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private formBuilder: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private elementRef: ElementRef,
    private ngZone: NgZone) {

  }

  client: Client = new Client();

  genres: string[] = ['male', 'female'];
  clientForm: FormGroup;
  regexEmail = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  onCancel() {
    this.location.back();
  }
  onSubmit() {
    var clientSaved: Client = this.clientForm.value as Client;
    console.log(this.clientForm);
    console.log(clientSaved);
    console.log("id => " + clientSaved.id);
    this.clientService.save(clientSaved);
    this.router.navigate(['/client']);
  }

  ngOnInit() {
    
    jQuery(this.elementRef.nativeElement).find('#clickJson').on('click', function () {
            
            if (jQuery('#json').is(":visible")) {
                    jQuery('#json').slideUp(300);
                } else {  
                    jQuery('#json').slideDown(300);
                }
    });

    if (this.router.url.indexOf('edit') >= 0) {
      console.log('route edit');
      this.isEdit = true;

    } else {
      console.log('route add');
      this.isEdit = false;
    }


    this.buildForm();

    //google map API
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['geocode'],
        componentRestrictions: { country: 'fr' }
      });
      this.autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
          console.log(place);
          this.fillInAddress(place);
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });


  }

  ngAfterViewInit() {
    console.log('isEdit =>');
    console.log(this.isEdit);
    if (this.isEdit) {
      this.route.params
        .switchMap((params: any) => {
          var client = this.clientService.getClient(params['id']);
          return client;
        })
        .subscribe(client => {
          this.client = client as Client;
          this.buildForm()
        });
    }

    console.log(this.clientForm);


  }

  buildForm() {
    this.clientForm = this.formBuilder.group({
      'id' : [this.client.id],
      'nom': [this.client.nom, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      'prenom': [this.client.prenom, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      'email': [this.client.email, [Validators.required, Validators.pattern(this.regexEmail)]],
      'genre': [this.client.genre, [Validators.required]],
      'description': [this.client.description, [Validators.required]],
      'telephone': [this.client.telephone, [Validators.required]],
      'adresse': [''],
      'rue': [this.client.rue, [Validators.required]],
      'zipcode': [this.client.zipcode, [Validators.required]],
      'ville': [this.client.ville, [Validators.required]],
      'pays': [this.client.pays, [Validators.required]],
      'imgPath': [this.client.imgPath, [Validators.required]],
      'latitude': [null, [Validators.required]],
      'longitude': [null, [Validators.required]]
    });

    this.clientForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }


  onValueChanged(data?: any) {
    if (!this.clientForm) { return; }
    const form = this.clientForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = ''; //a la base les champs d'erreur sont vide
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'nom': '',
    'prenom': '',
    'email': '',
    'genre': '',
    'description': '',
    'telephone': '',
    'rue': '',
    'zipcode': '',
    'ville': '',
    'pays': '',
    'imgPath': ''
  };

  pristineMessages = {
    'nom': 'Veuillez inscrire votre nom',
    'prenom': 'Veuillez inscrire votre prénom',
    'email': 'Veuillez inscrire votre adresse email',
    'genre': 'Veuillez choisir un genre',
    'description': 'Veuillez donner une courte description',
    'telephone': 'Veuillez inscrire votre numéro de téléphone au format : 0102030405',
    'adresse': 'Veuillez inscrire votre adresse (autocomplétion de celle-ci)',
    'imgPath': 'Veuillez inscrire votre portrait'
  };

  validationMessages = {
    'nom': {
      'required': 'le nom est obligatoire.'
    },
    'prenom': {
      'required': 'prenom est obligatoire.',
      'minlength': 'prenom must be at least 4 characters long.',
      'maxlength': 'prenom cannot be more than 24 characters long.'
    },
    'email': {
      'required': 'email est obligatoire.',
      'pattern': 'adresse email non conforme'
    },
    'genre': {
      'required': 'genre est obligatoire.'
    },
    'description': {
      'required': 'description est obligatoire.'
    },
    'telephone': {
      'required': 'telephone est obligatoire.'
    },
    // 'adresse': {
    //   'required': 'adresse est obligatoire.'
    // },
    'rue': {
      'required': 'rue est obligatoire.'
    },
    'code postal': {
      'required': 'code postal est obligatoire.'
    },
    'ville': {
      'required': 'ville est obligatoire.'
    },
    'pays': {
      'required': 'pays est obligatoire.'
    },
    'imgPath': {
      'required': 'imgPath est obligatoire.'
    }
  };


  //methode google map pour recuperer different champs de l'adresse
  fillInAddress(place) {

    var num = place.address_components[0].long_name;
    console.log(num);
    var rue = place.address_components[1].long_name;
    console.log(rue);
    var ville = place.address_components[2].long_name;
    console.log(ville);
    var pays = place.address_components[5].long_name;
    console.log(pays);
    var zipcode = place.address_components[6].long_name;
    console.log(zipcode);
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();


    this.clientForm.value.rue = rue;
    this.clientForm.value.ville = ville;
    this.clientForm.value.zipcode = zipcode;
    this.clientForm.value.pays = pays;
    this.clientForm.value.latitude = lat;
    this.clientForm.value.longitude = lng;
  }

  //methode google map pour set le marker sur la map
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

}
