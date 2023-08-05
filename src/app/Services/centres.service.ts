import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Center } from '../models/Center.model';

@Injectable({
  providedIn: 'root'
})
export class CentresService {

  private apiUrl = 'http://localhost:3000/Centres';

  constructor(private http: HttpClient) { }

    searchCenters(name: string, ville: string, nomReseau: string): Observable<Center[]> {
      
  
      let url = `${this.apiUrl}?`;
  
      if (name) {
        url += `name=${name}&`;
      }
  
      if (ville) {
        url += `ville=${ville}&`;
      }
  
      if (nomReseau) {
        url += `nomReseau=${nomReseau}&`;
      }
  
      // Remove the trailing '&' if any
      if (url.endsWith('&')) {
        url = url.slice(0, -1);
      }
  
      return this.http.get<Center[]>(url);
    
  }
}

 