import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Center } from '../../models/Center.model';
import { ReverseGeocodingServiceService } from 'src/app/Services/reverse-geocoding-service.service';
import * as L from 'leaflet';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})


export class DetailsComponent {
  centerId!: number;
  centersData!: Center[];
  urlLocation !:string;
  Latitude !: number ; // Remplacez par la latitude souhaitée
  Longitude !: number ; // Remplacez par la longitude souhaitée
  locationData: any;
  map!: L.Map;
  adresse !:string;


  constructor(
    private http:HttpClient,
    private route: ActivatedRoute,
    private reverseGeocodingServiceService :ReverseGeocodingServiceService
     ) { 
  
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.centerId = +params['id'];
     
    });
    this.http.get<Center[]>('http://localhost:3000/Centres', { params: { id: this.centerId.toString() } }).subscribe(
      data=>{
        this.centersData=data;
        console.log(this.centersData);

        const filteredCenters = this.centersData.filter(center => center.id === this.centerId);
    
        if (filteredCenters.length > 0) {
          this.urlLocation = filteredCenters[0].urlLocation; // Utilisez "this" pour définir la propriété de la classe
          console.log('urlLocation:', this.urlLocation);
          this.Latitude = filteredCenters[0].Latitude; // Utilisez "this" pour définir la propriété de la classe
          console.log('Latitude:', this.Latitude);
          this.Longitude = filteredCenters[0].Longitude; 
          this.adresse = filteredCenters[0].adresse;
          console.log(this.adresse)// Utilisez "this" pour définir la propriété de la classe
          console.log('Longitude:', this.Longitude);
          

        } else {
          console.log("Aucun centre trouvé avec l'ID donné.");
        }
      },
      error=>{
        console.log(error)
      }
    );

  }
  

}
