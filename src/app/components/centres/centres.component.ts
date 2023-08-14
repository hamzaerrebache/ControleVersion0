import { Component, Input, OnInit } from '@angular/core';
import { ReverseGeocodingServiceService } from '../../Services/reverse-geocoding-service.service';
import { Center } from '../../models/Center.model';
import {Coordinates} from '../../models/Coordinates.model';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Message } from 'primeng/api';



export interface City{
  idCity:number,
  nameCity:string
}

@Component({
  selector: 'app-centres',
  templateUrl: './centres.component.html',
  styleUrls: ['./centres.component.css']
})

export class CentresComponent implements OnInit{
 
  lat!: number;
  lng!: number;
  CurrentAdress!: string;
  distance!: any;
  map!: L.Map;
  geograph!:boolean;
  centers!: Center[];
  Centers1: any[]=[];
  markers!:Coordinates[];
  latitude!: number;
  longitude!: number;
  cities: City[] = [];
  Cities: string[] = ["casablanca","mohammedia"];
  myForm!: FormGroup;
  Reseaux:string[]=["DEKRA","SGS","REVITEX","SALAMA"]
  calcul:boolean=false;
  ville:string | any;
  nomReseau:string | any;
  messages: Message[]=[];
  messages1: Message[]=[];
  messages2: Message[]=[];
  error!: boolean;
  isChecked:boolean=false;

  constructor(private http:HttpClient,private reverseGeocodingService:ReverseGeocodingServiceService,public fb: FormBuilder) {
   
  }


  ngOnInit(): void {
    
   
    this.myForm = this.fb.group({
      city: {value:'',disabled:false},
      nomReseau:{value:'',disabled:false},
      checkboxControl: new FormControl(false)     
    });
    
    
    this.http.get<Center[]>('http://localhost:3000/Centres').subscribe(
    (data:Center[])=>{
      this.centers=data;
      console.log(this.centers)
      this.centers.sort((center1, center2) => {
        if (center1.name < center2.name) {
          return -1;
        } else if (center1.name > center2.name) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    error=>{
      console.log(error);

    }
    );
    
    
    this.getLocation();
    
    let inc=0;
    this.centers.forEach((center) => {
      if (!this.cities.some((city) => city.nameCity === center.ville)) {
        inc=inc+1;
        this.cities.push({idCity:inc, nameCity: center.ville });
      }
    });  

  }


  onSubmit() {
    this.ville=this.myForm.value.city;
    this.nomReseau=this.myForm.value.nomReseau;
    this.error=this.myForm.value.checkboxControl;
    if(!this.Cities.includes(this.ville) && !this.Reseaux.includes(this.nomReseau)){
      this.error=true;
      this.ville=null;
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Essayez à nouveau.' }];
    }

    if(this.error==true){
     
      this.getLocation();
      

    }

    this.messages1=[{  severity: 'warn', summary: 'Waning', detail: 'Vous avez désélectionner l option de trier' }];
    
      
    }
    
    
  suggestions: string[] = [];
  typeahead: FormControl = new FormControl();
  suggest() {
    this.suggestions = this.Cities
      .filter(c => c.startsWith(this.typeahead.value))
      .slice(0, 5);
  }
  toggleCityInput(){
  
  }
  getCentersByCity(): Center[]  {
     return this.centers.filter((center) => center.ville.includes(this.ville));
  }
  getCentersByReseau(): Center[]  {
    return this.centers.filter((center) => center.nomReseau.includes(this.nomReseau));
 }
 getCentersByCityAndReseau(): Center[]  {
  return this.centers.filter((center) => center.nomReseau.includes(this.nomReseau ) && center.ville.includes(this.ville));
}


  private initMap(): void {
    this.map = L.map('map').setView([this.lat,this.lng],9);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });    
    const myCustomColour = '#FF0000';

    const markerHtmlStyles = `
      background-color: ${myCustomColour};
      width: 2.5rem;
      height: 2.5rem;
      display: block;
      left: -1.5rem;
      top: -1.5rem;
      position: relative;
      border-radius: 2rem 3rem 0;
      transform: rotate(45deg);
      border: 1px solid #FFFFFF`
    
    const icon = L.divIcon({
      className: "my-custom-pin",
      html: `<span style="${markerHtmlStyles}" />`
    })

    const mark=L.marker([this.lat,this.lng],{icon:icon}).bindPopup(this.CurrentAdress);
    mark.addTo(this.map);
    tiles.addTo(this.map);

  }
  getLocation(){
    this.geograph=true;
    if (navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.ConvertCoordinatesToAddress(this.lat,this.lng)  
      },
      error=>{
       if (error.code === 2) {
          alert("Location information is unavailable.");
      } else if (error.code === 3) {
          alert("Timed out while trying to get location.");
      }

      });
    }
    
    this.initMap();
    this.centers.forEach(center=>{
      let latitude!:any;
      let longitude:any;
    this.convertAddressToLatLng(center.adresse).then(coordinates=>{
       latitude=coordinates?.latitude;
       longitude=coordinates?.longitude;
       center.distance=Math.trunc(this.calculDistance(this.lat,this.lng,latitude,longitude));
       localStorage.setItem('list_'+center.name,JSON.stringify({id:center.id,distance:center.distance}));
    });
       });

       this.centers.forEach(center=>{
        const dataString=localStorage.getItem('list_'+center.name);
        if(dataString!==null){
        const jsonObject=JSON.parse(dataString);
          this.Centers1.push({id:jsonObject.id,name:center.name,tele:center.tele,
            adresse:center.adresse,
            ville:center.adresse,
            categorie:center.categorie,
            distance:jsonObject.distance,
          logReseau:center.logReseau
          });  
           
        }
      });   
      this.Centers1.sort((a, b) => {
        if (a.distance !== b.distance) {
          return a.distance - b.distance;
        } else {
          // Si les distances sont égales, trier par nom de centre en ordre alphabétique
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        }
      });
      
      this.calcul=true;
  }

  calculDistance(latitude:number,longitude:number,latitude1:number,longitude1:number):number{
    const fromCoordinates= { latitude: latitude, longitude: longitude }; 
    const toCoordinates={ latitude: latitude1, longitude: longitude1 }; 
    const distanceInKm = this.reverseGeocodingService.haversineDistance(fromCoordinates, toCoordinates, 'km');
    this.distance=distanceInKm;  
    return this.distance;
}



  ConvertCoordinatesToAddress(latitude: number, longitude: number) {
    return this.reverseGeocodingService.getAddress(latitude, longitude).then((address) => {
      this.CurrentAdress=address;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  async convertAddressToLatLng(address:string): Promise<{ latitude: number; longitude: number; } |null>{
    try {
      const location = await this.reverseGeocodingService.getCoordinates(address);
      let CurrentCoordinates = { latitude: location.latitude, longitude: location.longitude };
      
        const mark=L.marker([CurrentCoordinates.latitude,CurrentCoordinates.longitude]).bindPopup(address);
        mark.addTo(this.map);
  

         return CurrentCoordinates;
     

    } catch (error) {
      console.error('Error converting address to coordinates:', error);
      return null;
    }
  }

  

}
