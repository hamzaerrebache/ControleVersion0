import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../models/Reclamation.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'https://api-control-technique.vercel.app/Reclamation';

  constructor(private http: HttpClient) { }

  getAllReclamation(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.apiUrl);
  }

  createReclamation(reclamation: Reclamation): Observable<any> {
    return this.http.post<Reclamation[]>(this.apiUrl, reclamation);
  }

  getComplaintDetailsByTrackingCode(trackingCode: string): Observable<Reclamation> {
    const url = `${this.apiUrl}?trackingCode=${trackingCode}`;
    return this.http.get<Reclamation>(url);
  }
  getComplaintDetailsById(id:number): Observable<Reclamation[]> {
    const url = `${this.apiUrl}?id=${id}`; // Mettez à jour l'URL pour correspondre à votre API
    return this.http.get<Reclamation[]>(url);
  }
  
}
