import { Component,OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {FormGroup,FormBuilder} from '@angular/forms';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 

  suggestions:string[]=["Azemmour","DEKRA PORTE 4", "DEKRA PORTE 2","DEKRA PORTE 3","CVT El khalil","Centre wifak","CVTM","Visite T .NEAB"]
  Ville:string[]=["Casablanca","Mohammedia"]
  NomReseau:string[]=["DEKRA","REVITEX","SALAMA","SGS"]
  nom!:string;
  filteredSuggestions: string[] = [];
  searchText = '';
  

  myForm!:FormGroup

  ngOnInit(): void {
    this.myForm = this.fb.group({
      city: '',
      Vile: '',
      nReseau: ''
    });
 
  }
  
  constructor(
     public router: Router,
     public activatedRoute: ActivatedRoute, private fb:FormBuilder 
     ) {
      
     }

   
     onInputChange(): void {
       this.filteredSuggestions = this.suggestions.filter(suggestion =>
         suggestion.toLowerCase().includes(this.searchText.toLowerCase())
       );
     }


  
     
     onSearch() {
      this.router.navigate(['List-centres'], {
        queryParams: { name: this.myForm.value.city, ville: this.myForm.value.Vile ,nomReseau: this.myForm.value.nReseau }
       
      });
     
      this.myForm.reset();
      
    }
 
}
