import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Center } from 'src/app/models/Center.model';

@Component({
  selector: 'app-video-youtube',
  templateUrl: './video-youtube.component.html',
  styleUrls: ['./video-youtube.component.css']
})
export class VideoYoutubeComponent implements OnInit {
  Centres!:Center[]
  len!:number
  constructor(private http:HttpClient) {}



  ngOnInit(): void {
    this.http.get<Center[]>('http://localhost:3000/Centres').subscribe(
      data=>{
        this.Centres=data;

      },
      error=>{
        console.log(error);
      }
    );
    this.len=this.Centres.length
  }

}
