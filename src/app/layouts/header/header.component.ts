import { Component } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  name !: string;
  ville !: string;
  nomReseau !:string;

  Name:string[]=["Azemmour","DEKRA PORTE 4", "DEKRA PORTE 2","DEKRA PORTE 3","CVT El khalil","Centre wifak","CVTM","Visite T .NEAB"]
  Ville:string[]=["Casablanca","Mohammédia"]
  NomReseau:string[]=["DEKRA","VITAPS"]



  
  constructor(
     public router: Router,
     public activatedRoute: ActivatedRoute, 
     ) {}
     
     onSearch() {
      // Navigate to the list-result page with search query and category as query parameters
      this.router.navigate(['List-centres'], {
        queryParams: { name: this.name, ville: this.ville ,nomReseau: this.nomReseau }
       
      });
      this.name="";
      this.ville="";
      this.nomReseau ="";
    }

}
