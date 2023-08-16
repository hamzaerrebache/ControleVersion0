import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendezVous  } from '../models/RendezVous';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private apiUrl = 'https://api-pl73.vercel.app/Rendez_vous';

  constructor(private http: HttpClient) { }

  getAllRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(this.apiUrl);
  }

  createRendezVous(rendezVous: RendezVous): Observable<any> {
    return this.http.post<RendezVous[]>(this.apiUrl, rendezVous);
  }
}