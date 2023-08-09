import { Component, Input, OnInit } from '@angular/core';
import { Center } from 'src/app/models/Center.model';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit{
  
  @Input() Data!:Center[];
  email!:string;


  ngOnInit(): void {

    for(let center of this.Data){
      this.email=center.name+"@gmail.com";

    }
   
  }

}
