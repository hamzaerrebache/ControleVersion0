import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Center } from 'src/app/models/Center.model';
import { CentresService } from 'src/app/Services/centres.service';

@Component({
  selector: 'app-list-centres',
  templateUrl: './list-centres.component.html',
  styleUrls: ['./list-centres.component.css']
})
export class ListCentresComponent  implements OnInit {

  searchResults !: Center[]; // Replace 'any' with the actual data type returned by your API
  queryValue !: string | null;
  categoryValue !: string | null;

  constructor( 
    private route: ActivatedRoute ,
    private centresService:CentresService,
    private router : Router  ) { 

  }

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    const name = queryParams['name'] || '';
    console.log(name);
    const ville = queryParams['ville'] || '';
    console.log(ville);
    const nomReseau = queryParams['nomReseau'] || '';
    console.log(nomReseau);

    // Call the service to search for centers based on the query parameters
    this.centresService.searchCenters(name, ville, nomReseau).subscribe(
      (data: any) => {
        this.searchResults = data; // Assuming the API response is an array of center objects
        console.log(this.searchResults)
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }
  }
  
