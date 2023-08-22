import { Commentaire } from '../models/Commentaie.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private apiUrl = 'https://api-control-technique.vercel.app/Commentaire';

  constructor(private http: HttpClient) { }

  getAllCommentaireParCentre(centre_id:number): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.apiUrl}?centre_id=${centre_id}`);
  }

  createCommentaire(commentaire: Commentaire): Observable<any> {
    return this.http.post<Commentaire[]>(this.apiUrl, commentaire);
  }
  
}