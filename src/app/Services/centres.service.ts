import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Center } from '../models/Center.model';

@Injectable({
  providedIn: 'root'
})
export class CentresService {

  private apiUrl = 'https://api-control-technique.vercel.app/Centres';

  constructor(private http: HttpClient) { }
  Cities: string[] = ["casablanca","mohammedia"];
  Reseaux:string[]=["DEKRA","SGS","REVITEX","SALAMA"];
    searchCenters(name: string, ville: string, nomReseau: string): Observable<Center[]> {
      
       const lowerCaseName = name ? name.toLowerCase() : '';
       const lowerCaseVille = ville ? ville.toLowerCase() : '';
       const lowerCaseNomReseau = nomReseau ? nomReseau.toUpperCase() : '';
      
  
      let url = `${this.apiUrl}?`;
  
      if (lowerCaseName ) {
        url += `name=${lowerCaseName}&`;
      }
  
      if (lowerCaseVille) {
        url += `ville=${lowerCaseVille}&`;
      }
  
      if (lowerCaseNomReseau) {
        url += `nomReseau=${lowerCaseNomReseau}&`;
      }
  
      // Remove the trailing '&' if any
      if (url.endsWith('&')) {
        url = url.slice(0, -1);
      }
  
      return this.http.get<Center[]>(url);
    
  }
  searchSliderCenters(data:string) :Observable<Center[]>{
    let url = `${this.apiUrl}`;
    const lowerCaseData = data ? data.toLowerCase() : '';
    const upperCaseData = data ? data.toUpperCase() : '';
    if(this.Cities.includes(lowerCaseData)){
      url += `?ville=${lowerCaseData}`;
    }
     if(this.Reseaux.includes(upperCaseData)){
      url += `?nomReseau=${upperCaseData}`;
    }
    if(!this.Cities.includes(lowerCaseData) && !this.Reseaux.includes(upperCaseData)){
      url += `?name=${lowerCaseData}`;
    }
    return this.http.get<Center[]>(url);

  }
}

 