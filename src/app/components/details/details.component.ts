import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Center } from '../../models/Center.model';
import * as L from 'leaflet';
import { ReverseGeocodingServiceService } from 'src/app/Services/reverse-geocoding-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentaireService } from 'src/app/Services/commentaire.service';
import { Commentaire } from 'src/app/models/Commentaie.model';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})


export class DetailsComponent {
  centerId!: number;
  centersData!: Center[];
  DistanceCurrentCenter!: any;
  map!: L.Map;
  latitude!: any;
  longitude!: any;
  adresse!: string;
  centers!: Center[]
  logoReseau!: string;
  Centers1: any[] = [];
  value!: number;
  CommentForm !: FormGroup;
  allCommentParCentre!:Commentaire[];
  formattedDate :any;
  commentsEnabled: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private reverseGeocodingService: ReverseGeocodingServiceService,
    private commentaireService: CommentaireService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.CommentForm = this.fb.group({
      rating: [null, Validators.required],
      description: ['', Validators.required],
      name: ['',Validators.required]

    });
    const currentDate = new Date();
    this.formattedDate = this.datePipe.transform(currentDate, 'dd/MM/yyyy HH:mm');
  }
  ngOnInit() {
    this.http.get<Center[]>('https://api-control-technique.vercel.app/Centres').subscribe(
      data => {
        this.centers = data;
        console.log(data);
        this.centers.forEach(center => {
          const dataString = localStorage.getItem('list_' + center.name);
          console.log(dataString)
          if (dataString) {
            console.log(JSON.parse(dataString));
            if (JSON.parse(dataString).id == this.centerId) {
              console.log("yes", this.centerId);
              this.DistanceCurrentCenter = JSON.parse(dataString).distance;
              console.log(this.DistanceCurrentCenter);
            }

          }


        });
        this.commentaireService.getAllCommentaireParCentre(this.centerId).subscribe(
          (data:Commentaire[])=>{
              this.allCommentParCentre=data;
              console.log("dfdsytfydsydsyfdsytfdyf",this.allCommentParCentre);
            });
      
        let inc = 0;
        this.centers.forEach(center => {

          const dataString = localStorage.getItem('list_' + center.name);

          if (dataString) {

            if ((JSON.parse(dataString).distance < this.DistanceCurrentCenter) && inc < 3) {
              this.Centers1.push({ id: JSON.parse(dataString).id, name: center.name, tele: center.tele, adresse: center.adresse, distance: JSON.parse(dataString).distance, logReseau: center.logReseau })
              inc++;
            }

          }


        })
      },
      error => {
        console.log(error);
      }
    );





    this.route.queryParams.subscribe(params => {
      this.centerId = +params['id'];

    });




    this.http.get<Center[]>('https://api-control-technique.vercel.app/Centres', { params: { id: this.centerId.toString() } }).subscribe(
      data => {
        this.centersData = data;
        this.centersData.forEach(center => {

          this.logoReseau = center.logReseau;

        })
        console.log(this.centersData);
        this.centersData.forEach(center => {
          console.log(center.adresse)
          this.convertAddressToLatLng(center.adresse);
        })

      },
      error => {
        console.log(error)
      }
    );

    const imageElement = document.getElementById("imageContainer") as HTMLImageElement;

    const imageUrl = this.logoReseau;

    imageElement.src = imageUrl;
    
   

  
   
  }
  toggleComments() {
    this.commentsEnabled = !this.commentsEnabled;
  }




  async convertAddressToLatLng(address: string) {
    try {
      console.log('i m here')
      const myIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
      });
      const location = await this.reverseGeocodingService.getCoordinates(address);
      let CurrentCoordinates = { latitude: location.latitude, longitude: location.longitude };
      console.log(address)
      console.log(CurrentCoordinates)
      this.map = L.map('map', {
        center: [CurrentCoordinates.latitude, CurrentCoordinates.longitude],
        zoom: 9
      });

      // Add the OpenStreetMap tile layer to the map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);

      const mark = L.marker([CurrentCoordinates.latitude, CurrentCoordinates.longitude], { icon: myIcon }).bindPopup(address);
      mark.addTo(this.map);
      mark.openPopup();
      mark.on('mouseover', function (e) {
        mark.openPopup();
      });
      mark.on('mouseout', function (e) {
        mark.closePopup();
      });

    } catch (error) {
      console.error('Error converting address to coordinates:', error);

    }
  }


  RendezVous(idCentre: number) {
    // Enregistrement de l'ID du centre dans le stockage local
    localStorage.setItem('selectedCentreId', idCentre.toString());
    
  }
  
  Reclamation(idCentre: number) {
    // Enregistrement de l'ID du centre dans le stockage local
    localStorage.setItem('selectedCentreId', idCentre.toString());
    
  }


  sendComment() {
    if (this.CommentForm.valid) {
      const newComment: Commentaire = {
        id: 0,  // Remplacez par la valeur appropriée
        centre_id: this.centerId,  // Remplacez par la valeur appropriée
        description: this.CommentForm.get('description')?.value,
        name: this.CommentForm.get('name')?.value,
        value: this.CommentForm.get('rating')?.value,
        date: this.formattedDate
      };
      console.log('newComment newComment',newComment);
      this.commentaireService.createCommentaire(newComment).subscribe(
        (response) => {
          console.log('Commentaire ajouté avec succès', response);
          // Réinitialiser le formulaire après avoir soumis le commentaire
          this.CommentForm.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du commentaire', error);
        }
      );
      this.commentaireService.getAllCommentaireParCentre(this.centerId).subscribe(
        (data:Commentaire[])=>{
            this.allCommentParCentre=data;
            console.log("dfdsytfydsydsyfdsytfdyf",this.allCommentParCentre);
          });
    }
    
  }




}