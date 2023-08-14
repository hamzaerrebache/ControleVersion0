import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { RendezVousService } from 'src/app/Services/rendez-vous.service';
import { RendezVous } from 'src/app/models/RendezVous';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import Swal from 'sweetalert2';

import {ActivatedRoute,Router} from '@angular/router';
import { CommonModule } from '@angular/common';
 enum TYPE {
  ERROR='error',
  SUCCESS='success',
  WARNING='warning',
  INFO='info',
  QUESTION='question'
}

interface Times {
  value: string;
  viewValue: string;
}
interface Centres {
  value: number;
  viewValue: string;
}
interface City {
  name: string;
  code: string;
}
interface DropdownOptions{
  label:string;
  value:string;
}

@Component({
  selector: 'stepper-errors-example,component',
  templateUrl: 'stepper-errors-example.component.html',
  styleUrls: ['stepper-errors-example.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule, 
    NgFor,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule
  ],
})
export class StepperErrorsExampleComponent  implements OnInit {
  stepperFormGroup!: FormGroup; // Utilisation de l'opérateur '!' pour indiquer qu'elle sera initialisée
  firstFormGroup !: FormGroup;
  secondFormGroup !: FormGroup;
  thirdFormGroup !: FormGroup;
  fourthFormGroup !: FormGroup;
  stepper: any;
  cities: City[] | undefined;
  selectedCity !: DropdownOptions;
  dropdownOptions !:DropdownOptions[];
  isSelectDisabled: boolean = true; 

  times: Times[] = [
    {value: '9:00 AM - 11:00 AM', viewValue: '9:00 AM - 11:00 AM'},
    {value: '11:00 AM - 13:00 PM', viewValue: '11:00 AM - 13:00 PM'},
    {value: '13:00 PM - 15:00 PM', viewValue: '13:00 PM - 15:00 PM'},
    {value: '15:00 PM - 17:00 PM', viewValue: '15:00 PM - 17:00 PM'},
    {value: '17:00 PM - 19:00 PM', viewValue: '17:00 PM - 19:00 PM'}
  ];
  centres: Centres[] = [
    {value: 1, viewValue: 'Azemmour'},
    {value: 2, viewValue: 'Dekra porte 4'},
    {value: 3, viewValue: 'Cvt el khalil'},
    {value: 4, viewValue: 'Wifak'},
    {value: 5, viewValue: 'Socotex Control'},
    {value: 6, viewValue: 'Lnti'},
    {value: 7, viewValue: 'T.NEAB'},
    {value: 8, viewValue: 'Cvtm'},


  ];



  constructor(
    private _formBuilder: FormBuilder,
    private rendezVousService: RendezVousService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.dropdownOptions = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ];
    this.stepperFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required]
    });

    this.firstFormGroup = this._formBuilder.group({
      PreCtrl: ['',  [Validators.required, Validators.maxLength(100)]],
      NomCtrl: ['',  [Validators.required, Validators.maxLength(100)]],
      EmailCtrl: ['', [Validators.required, Validators.email]],
      TeleCtrl: ['',  [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]]
    });
    this.secondFormGroup = this._formBuilder.group({
      MakeCtrl: ['', [Validators.required, Validators.maxLength(100)]],
      ModelCtrl: ['', [Validators.required, Validators.maxLength(100)]],
      yearCtrl: ['', [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)]],
      textCtrl: ['', Validators.required]
    });
  
    this.thirdFormGroup = this._formBuilder.group({
     // Contrôle pour le choix d'attendre ou de déposer le véhicule
      centreCtrl: [''] // Contrôle pour choisir le centre de service
    });
    this.fourthFormGroup = this._formBuilder.group({
      dateCtrl: ['', Validators.required], // Contrôle pour la date du rendez-vous
      timeCtrl: ['', Validators.required] // Contrôle pour l'heure du rendez-vous
    });
  }

  // Reste du code...
  submitRendezVous() {
    
    const rendezVousData :RendezVous = {
      id: 0,
      // Données de la première étape
      first_name: this.firstFormGroup.get('PreCtrl')?.value,
      last_name: this.firstFormGroup.get('NomCtrl')?.value,
      email: this.firstFormGroup.get('EmailCtrl')?.value,
      tele: this.firstFormGroup.get('TeleCtrl')?.value,

      // Données de la deuxième étape
      make: this.secondFormGroup.get('MakeCtrl')?.value,
      model: this.secondFormGroup.get('ModelCtrl')?.value,
      year: this.secondFormGroup.get('yearCtrl')?.value,
      description: this.secondFormGroup.get('textCtrl')?.value,

      // Données de la troisième étape
      centre_id: this.thirdFormGroup.get('centreCtrl')?.value,

      // Données de la quatrième étape
      date: this.fourthFormGroup.get('dateCtrl')?.value,
      time: this.fourthFormGroup.get('timeCtrl')?.value,
    };
  
    // Appel à la méthode de service pour créer le rendez-vous
    this.rendezVousService.createRendezVous(rendezVousData).subscribe(
      response => {
        console.log('Rendez-vous créé avec succès !', response);
        // Réinitialiser le groupe de formulaires et le stepper
        this.stepperFormGroup.reset();
        this.stepper.reset();
      },
      error => {
        console.error('Une erreur est survenue lors de la création du rendez-vous :', error);
      },
      );
  
        Swal.fire({
          title: 'Contenu du message de réussite',
          text: "retour page d'accueil",
          icon: TYPE.SUCCESS,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
          
            window.location.href = '/'; 
         
          }
        });
        this.isSelectDisabled= false; 
  }
}