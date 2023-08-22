import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CentresService } from 'src/app/Services/centres.service';
import { Center } from 'src/app/models/Center.model';

@Component({
  selector: 'app-list-slider-centre',
  templateUrl: './list-slider-centre.component.html',
  styleUrls: ['./list-slider-centre.component.css']
})
export class ListSliderCentreComponent implements OnInit {
  CurrentUrl!: string;
  searchResults!: Center[];
  
  constructor(private route: ActivatedRoute ,
    private centresService:CentresService,public router: Router){

  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
     
      const data=params.get('data')?.toString();
     
      this.CurrentUrl=this.router.url;
      
      this.centresService.searchSliderCenters(data || '').subscribe(
        (data: Center[]) => {
          this.searchResults = data;
          console.log(this.searchResults)
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
  });
 }

}