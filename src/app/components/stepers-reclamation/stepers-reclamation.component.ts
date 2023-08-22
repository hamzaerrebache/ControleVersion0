import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
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
import { Reclamation } from 'src/app/models/Reclamation.model';
import { ReclamationService } from './../../Services/reclamation.service';



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
interface TypeReclamations{
  name: string;
  code: string;
} 
interface StatutVehicules{
  name: string;
  code: string;
}
interface Resolution{
  name: string;
  code: string;
}
@Component({
  selector: 'stepers-reclamation',
  templateUrl: './stepers-reclamation.component.html',
  styleUrls: ['./stepers-reclamation.component.css'],
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
export class StepersReclamationComponent  implements OnInit {
  stepperFormGroup!: FormGroup; // Utilisation de l'opérateur '!' pour indiquer qu'elle sera initialisée
  firstFormGroup !: FormGroup;
  secondFormGroup !: FormGroup;
  thirdFormGroup !: FormGroup;
  fourthFormGroup !: FormGroup;
  fifthFormGroup !: FormGroup;
  sixthFormGroup !: FormGroup;
  seventhFormGroup !: FormGroup;
  stepper: any;
  newDate!:string;
  centerName!:string
  centers!:Center[];
  cities: City[] | undefined;
  selectedCity !: DropdownOptions;
  dropdownOptions !:DropdownOptions[];
  isSelectDisabled: boolean = true; 
  statut:boolean=false;
  selectedReceipt: string | ArrayBuffer | null = null;
  selectedPhoto: string | ArrayBuffer | null = null;
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
    {value: 8, viewValue: 'Cvtm'}
  ];

  // Filtrage des centres en fonction de selectedCentreId
  filteredCentres: Centres[] = [];
  typeReclamations :TypeReclamations[] =[
    {name : 'problème technique' , code : 'problème technique'},
    {name : 'mauvais service' , code :  'mauvais service' },
    {name : "temps d'attente" , code : "temps d'attente"},
    {name : 'autre' , code : 'autre'},
  ];
  statutVehicules :StatutVehicules[] =[
    {name : "En possession" , code : "En possession"},
    {name : "Restitué après la visite technique" , code : "Restitué après la visite technique"}
  ]

  resolutions :Resolution[] =[
    {name : 'remboursement' , code : 'remboursement'},
    {name : 'nouvelle visite' , code : 'nouvelle visite'},
    {name : 'correction du problème' , code : 'correction du problème'},
  ]



  constructor(
    private _formBuilder: FormBuilder,
    private reclamationService: ReclamationService,
    public router: Router,
    public activatedRoute: ActivatedRoute,private http:HttpClient
  ) {}

  // private generateTrackingCode(): string {
  //   const timestamp = new Date().getTime();
  //   const randomString = Math.random().toString(36).substring(2, 10);
  //   return `${timestamp}-${randomString}`;
  // }
  private generateTrackingCode():string {
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const captchaLength = 6;
    
    let captcha = '';
    for (let i = 0; i < captchaLength; i++) {
      const randomIndex = Math.floor(Math.random() * possibleCharacters.length);
      captcha += possibleCharacters.charAt(randomIndex);
    }
    
    return captcha;
  }

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
      fourthCtrl: ['', Validators.required],
      fifthCtrl: ['', Validators.required],
      sixthCtrl: ['', Validators.required],
      seventhCtrl: ['', Validators.required],
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
      MatriculeCtrl: ['', [Validators.required, Validators.maxLength(10)]],
    });
  
    this.thirdFormGroup = this._formBuilder.group({
     // Contrôle pour le choix d'attendre ou de déposer le véhicule
      centreCtrl: ['',Validators.required] // Contrôle pour choisir le centre de service
    });
    this.fourthFormGroup = this._formBuilder.group({
      dateCtrl: ['', Validators.required], // Contrôle pour la date du rendez-vous
      timeCtrl: ['', Validators.required] // Contrôle pour l'heure du rendez-vous
    });
    this.fifthFormGroup = this._formBuilder.group({
      typeRecCtrl: ['', Validators.required], // Contrôle pour la date du rendez-vous
      descriptionCtrl: ['', Validators.required] // Contrôle pour l'heure du rendez-vous

    });
    this.sixthFormGroup = this._formBuilder.group({
      receiptCtrl: ['', Validators.required], // Contrôle pour la date du rendez-vous
      mediaCtrl: ['', Validators.required], // Contrôle pour l'heure du rendez-vous
   
    });
    this.seventhFormGroup = this._formBuilder.group({
      statutVehuculeCtrl: ['', Validators.required], // Contrôle pour la date du rendez-vous
      resolutionCtrl: ['', Validators.required] // Contrôle pour l'heure du rendez-vous
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
  onReceiptChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedReceipt = e.target?.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      this.selectedReceipt = null;
    }
  }
  onPhotoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedPhoto = e.target?.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      this.selectedPhoto = null;
    }
  }

  // Reste du code...
  submitReclamationData() {
 
    
    const reclamationData :Reclamation = {
      id: 0,
      // Données de la première étape
      first_name: this.firstFormGroup.get('PreCtrl')?.value,
      last_name: this.firstFormGroup.get('NomCtrl')?.value,
      email: this.firstFormGroup.get('EmailCtrl')?.value,
      tele: this.firstFormGroup.get('TeleCtrl')?.value,

      // Données de la deuxième étape
      make: this.secondFormGroup.get('MakeCtrl')?.value,
      model: this.secondFormGroup.get('ModelCtrl')?.value,
      matricule : this.secondFormGroup.get('MatriculeCtrl')?.value,
      // Données de la troisième étape
      centre_id: this.thirdFormGroup.get('centreCtrl')?.value,

      // Données de la quatrième étape
      date: this.fourthFormGroup.get('dateCtrl')?.value,
      time: this.fourthFormGroup.get('timeCtrl')?.value,

     // Données de la quatrième étape
      typeRec:this.fifthFormGroup.get('typeRecCtrl')?.value,
      description:this.fifthFormGroup.get('descriptionCtrl')?.value,

    // Données de la 5 étape
      copyReceipt:this.sixthFormGroup.get('receiptCtrl')?.value,
      media:this.sixthFormGroup.get('mediaCtrl')?.value,
    
     // Données de la 6 étape
      StatutVehucule:this.seventhFormGroup.get('statutVehuculeCtrl')?.value,
      resolution:this.seventhFormGroup.get('resolutionCtrl')?.value,
      trackingCode:this.generateTrackingCode(),
      statut:this.statut
    };
    console.log('reclamationData',reclamationData);

   
    const date = new Date(reclamationData.date);
     this.newDate = date.toLocaleDateString("fr-FR", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
});
    const foundCenter = this.centers.find(center => center.id === reclamationData.centre_id);

    if (foundCenter) {
       this.centerName = foundCenter.name;
      
    } else {
      console.log('Centre introuvable pour cet ID.');
    }

 
    const messageContent = `
    Bonjour ${reclamationData.first_name} ${reclamationData.last_name},
    Nous avons bien reçu votre réclamation concernant votre récente visite dans notre centre de service automobile.
    Votre code de suivi pour cette réclamation est : 
   
  `;
  const messageContent1 =`
  Nous apprécions vos commentaires et nous travaillons à résoudre vos préoccupations dès que possible.
  Si vous avez d'autres questions ou mises à jour concernant votre réclamation, n'hésitez pas à nous contacter à l'adresse ${this.centerName}@gmail.com.
  Nous vous remercions de votre compréhension.
  Cordialement,
  L'équipe du service client`
 
    emailjs.send('service_052ho5g', 'template_yviy42s', {
      message:messageContent, message1:messageContent1,
      From:`${this.centerName}@gmail.com`,
      To:reclamationData.email,
      subject:'Objet : Confirmation de votre plainte',
      code:reclamationData.trackingCode
    }
    , 'vpH_f734YyMUE8QmG')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    // Appel à la méthode de service pour créer le rendez-vous
    this.reclamationService.createReclamation(reclamationData).subscribe(
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
  
        // Swal.fire({
        //   title: 'Votre Réclamation a été effectué. Vérifiez votre e-mail pour obtenir votre code de suivi',
        //   text: "Retour à la page d'accueil",
        //   icon: TYPE.SUCCESS,
        //   confirmButtonText: 'OK',
         
        // }).then((result) => {
        //   if (result.isConfirmed) {
          
        //     window.location.href = '/'; 
         
        //   }
        // });
        this.isSelectDisabled= false; 
        localStorage.removeItem('selectedCentreId');
       
  }
  showSwwal(){
    Swal.fire({
      title: 'Votre Réclamation a été effectué. Vérifiez votre e-mail pour obtenir votre code de suivi',
      text: "Retour à la page d'accueil",
      icon: TYPE.SUCCESS,
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
      
        window.location.href = '/'; 
     
      }
    });;
  }
}