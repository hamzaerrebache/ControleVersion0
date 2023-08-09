import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { MenuItem, Message ,MessageService} from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ReverseGeocodingServiceService } from 'src/app/Services/reverse-geocoding-service.service';



@Component({
  selector: 'app-searsh',
  templateUrl: './searsh.component.html',
  styleUrls: ['./searsh.component.css'],
})
export class SearshComponent implements OnInit {

  constructor(private http:HttpClient,private route: ActivatedRoute,private reverseGeocodingService:ReverseGeocodingServiceService) { 
  
    
  }


  ngOnInit() {

}

}


