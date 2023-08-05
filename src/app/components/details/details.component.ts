import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Center } from '../../models/Center.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})


export class DetailsComponent {
  centerId!: number;
  centersData!: Center[];

  constructor(private http:HttpClient,private route: ActivatedRoute) { 
  
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.centerId = +params['id'];
     
    });
    
  
   
    this.http.get<Center[]>('http://localhost:3000/Centres', { params: { id: this.centerId.toString() } }).subscribe(
      data=>{
        this.centersData=data;
        console.log(this.centersData);
      },
      error=>{
        console.log(error)
      }
    );
 
  }

}
