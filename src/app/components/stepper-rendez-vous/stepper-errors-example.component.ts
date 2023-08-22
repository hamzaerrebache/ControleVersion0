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
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

import {ActivatedRoute,Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Center } from 'src/app/models/Center.model';

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
  newDate!:string;
  centerName!:string
  centers!:Center[];
  cities: City[] | undefined;
  selectedCity !: DropdownOptions;
  dropdownOptions !:DropdownOptions[];
  isSelectDisabled: boolean = true; 
  selectedCentreId: number | null = null;

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

  // Filtrage des centres en fonction de selectedCentreId
filteredCentres: Centres[] = [];




  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private rendezVousService: RendezVousService,
    public router: Router,
    public activatedRoute: ActivatedRoute,private http:HttpClient
  ) {}

  ngOnInit() {
    
    this.http.get<Center[]>('https://api-control-technique.vercel.app/Centres').subscribe(
      (data) => {
          this.centers=data
          console.log(this.centers)
      },
      error=>{
        console.log(error)
      }
    )
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
  const idCentre : string | null = localStorage.getItem('selectedCentreId');

    if (idCentre !== null) {
      this.selectedCentreId = parseInt(idCentre, 10);
      // Vous pouvez utiliser this.selectedCentreId pour effectuer des actions si nécessaire
      console.log("selectedCentreId ", this.selectedCentreId );
    }else if (idCentre === null){
      this.selectedCentreId=null
      console.log("selectedCentreId ", this.selectedCentreId )
    }

    // Remplir filteredCentres en fonction de selectedCentreId
    if (this.selectedCentreId !== null) {
      const selectedCentre = this.centres.find(centre => centre.value === this.selectedCentreId);
      if (selectedCentre) {
        this.filteredCentres.push(selectedCentre);
      }
    } else {
      this.filteredCentres = this.centres;
    }



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
    const date = new Date(rendezVousData.date);
     this.newDate = date.toLocaleDateString("fr-FR", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
});
    const foundCenter = this.centers.find(center => center.id === rendezVousData.centre_id);

    if (foundCenter) {
       this.centerName = foundCenter.name;
      
    } else {
      console.log('Centre introuvable pour cet ID.');
    }

 
    const messageContent = `
    

    Cher(e) ${rendezVousData.first_name} ${rendezVousData.last_name},
    
    Nous sommes ravis de confirmer votre prochain rendez-vous pour l'inspection de votre véhicule avec nous. Voici les détails de votre rendez-vous :
    
    Détails du rendez-vous :
    - Date : ${this.newDate}
    - Heure : ${rendezVousData.time}
    - Centre : ${this.centerName}
    
    Informations sur le véhicule :
    - Marque : ${rendezVousData.make}
    - Modèle : ${rendezVousData.model}
    - Année : ${rendezVousData.year}
    - Description : ${rendezVousData.description}
    
    Votre rendez-vous est important pour nous, et notre équipe est prête à vous offrir une expérience fluide. Si vous avez des questions ou si vous avez besoin d'apporter des modifications à votre rendez-vous, veuillez nous contacter à contoletechnique27000@gmail.com.
    
    Nous avons hâte de vous servir et de garantir la sécurité de votre véhicule.
    
    Cordialement,
    controletechnique.ma
  `;
 
    emailjs.send('service_nu1k82a', 'template_i6el8pk', {
      message:messageContent,
      From:'siliad@contact.ma',
      To:rendezVousData.email,
      subject:'Objet : Confirmation de votre rendez-vous pour l inspection de votre véhicule'
    }
    , 'PN9MwwaL0zw9s_F0V')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    // Appel à la méthode de service pour créer le rendez-vous
    this.rendezVousService.createRendezVous(rendezVousData).subscribe(
      response => {
        console.log('Rendez-vous créé avec succès !', response);
        // Réinitialiser le groupe de formulaires et le stepper
        this.stepperFormGroup.reset();
        
      },
      error => {
        console.error('Une erreur est survenue lors de la création du rendez-vous :', error);
      },
      );
      this.stepper.reset();
      localStorage.removeItem('selectedCentreId');
  
       
        this.isSelectDisabled= false; 
        localStorage.removeItem('selectedCentreId');
  }
  showSwwal(){
    Swal.fire({
      title: 'Votre rendez-vous a été effectué.',
      text: "Retour à la page d'accueil",
      icon: TYPE.SUCCESS,
      confirmButtonText: 'OK',
     
    }).then((result) => {
      if (result.isConfirmed) {
      
        window.location.href = '/'; 
     
      }
    });
  }
}