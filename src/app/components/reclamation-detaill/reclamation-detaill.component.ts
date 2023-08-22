import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReclamationService } from 'src/app/Services/reclamation.service';
import { Reclamation } from 'src/app/models/Reclamation.model';

@Component({
  selector: 'app-reclamation-detaill',
  templateUrl: './reclamation-detaill.component.html',
  styleUrls: ['./reclamation-detaill.component.css']
})
export class ReclamationDetaillComponent implements OnInit {

  reclamationDetails : Reclamation[] =[];
  test: any
  ID :number  | undefined;
  statutColorClass: string = ''; 
  Statut : string ='';
  
 

  constructor(
    private route: ActivatedRoute,
    private reclamationService: ReclamationService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; 
      console.log('ID extrait:', id); // Afficher l'ID extrait dans la console
      if (!isNaN(id)) {
        this.reclamationService.getComplaintDetailsById(id).subscribe(
          response => {
            this.reclamationDetails = response;
            if (this.reclamationDetails[0].statut === true) {
                 this.Statut='valide';
                 this.statutColorClass = 'text-success'; 
                } else if (this.reclamationDetails[0].statut === false) {
               this.Statut='en traitement';
                  this.statutColorClass = 'text-primary'; 
                }
            if (this.reclamationDetails.length > 0) {
              console.log(this.reclamationDetails[0]); 
              console.log(this.reclamationDetails[0].first_name);// Accéder au premier objet du tableau
            } else {
              console.error('Aucun détail de réclamation trouvé pour cet ID');
            }
          },
          error => {
            console.error('Une erreur s\'est produite lors de la récupération des détails de la réclamation :', error);
          }
        );
      } else {
        console.error('Identifiant invalide dans les paramètres de l\'URL');
      }
    });
  }

}
