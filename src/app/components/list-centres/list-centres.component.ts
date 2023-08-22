import { Component, OnInit,OnChanges,SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Center } from 'src/app/models/Center.model';
import { CentresService } from 'src/app/Services/centres.service';
import {CommonModule} from '@angular/common';
import {FormGroup,FormBuilder} from '@angular/forms';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-list-centres',
  templateUrl: './list-centres.component.html',
  styleUrls: ['./list-centres.component.css']
})
export class ListCentresComponent  implements OnInit {

  searchResults !: Center[]; 
  queryValue !: string | null;
  categoryValue !: string | null;
  myForm!:FormGroup;
  CurrentUrl!:string;
  messages: Message[]=[];
   
 
  constructor(
    private route: ActivatedRoute ,
    private centresService:CentresService,public router: Router) { 
      
  }

  ngOnInit() {
    
    

    this.route.queryParamMap.subscribe(params => {
      const name = params.get('name')?.toString();
      const ville = params.get('ville')?.toString();
      const nomReseau = params.get('nomReseau')?.toString();
     
      this.CurrentUrl=this.router.url;
      
      this.centresService.searchCenters(name || '', ville || '', nomReseau || '').subscribe(
        (data: Center[]) => {
          this.searchResults = data;
          console.log(this.searchResults)
          this.messages = [{ severity: 'error', summary: 'Error', detail: 'Y a pas des centres correspondant à votre recherche, une erreur est survenue.' }];
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
    }); 
  }
  
}
  
