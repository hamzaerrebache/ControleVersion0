import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReclamationService } from 'src/app/Services/reclamation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent {

  complaintDetails: any; // Adjust the type as per your data structure
  trackingCode !: string;
  statutAleatoire: string = '';

  constructor(private reclamationService: ReclamationService,private router: Router) {}

  showComplaintDetails() {
    this.reclamationService.getComplaintDetailsByTrackingCode(this.trackingCode).subscribe(
      response => {
        this.complaintDetails = response;
        if (this.complaintDetails.length>0) {
          this.displayComplaintDetails(this.complaintDetails[0].id);
        } else {
          this.showTrackingCodeNotFound();
        }
        this.trackingCode='';
      },
      error => {
        console.error('An error occurred while fetching complaint details:', error);
      }
    );

  }
  showTrackingCodeNotFound() {
    Swal.fire({
      icon: 'error',
      title: 'Code de Suivi Introuvable',
      text: "Nous n'avons pas trouvé de réclamation correspondant à ce code de suivi. Veuillez vérifier le code et réessayer."
    });
  }
  
  displayComplaintDetails(id : number) {
   

  this.router.navigate(['Reclamation',id]);

  }

handleCancelAction() {
  // This function will be executed when the user clicks the "Cancel" button
  console.log('User clicked the "Cancel" button');
  // You can add any additional actions or logic here
}

}
