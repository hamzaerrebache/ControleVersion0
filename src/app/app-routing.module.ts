import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { CentrePlusProcheComponent } from './components/centre-plus-proche/centre-plus-proche.component';
import { CentresComponent } from './components/centres/centres.component';
import { ContactComponent } from './components/contact/contact.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ServiceComponent } from './components/service/service.component';
import { TarifsComponent } from './components/tarifs/tarifs.component';
import { DetailsComponent } from './components/details/details.component';
import { ListCentresComponent } from './components/list-centres/list-centres.component';
import { PlusDetailVisitetechComponent } from "./components/plus-detail-visitetech/plus-detail-visitetech.component"


const routes: Routes = [
  { path:'', component: AccueilComponent },
  { path:'Centres', component: CentresComponent },
  { path:'Services', component: ServiceComponent },
  { path:'Contact', component: ContactComponent },
  { path:'Centre-plus-proche', component: CentrePlusProcheComponent },
  { path:'Rendez-vous', component: ReservationComponent },
  { path:'Center-details',component:DetailsComponent},
  { path:'List-centres',component:ListCentresComponent},
  { path:'plus-details',component:PlusDetailVisitetechComponent},
  { path:'Tarifs',component:TarifsComponent},
  

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
