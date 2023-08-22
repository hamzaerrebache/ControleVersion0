import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { CentrePlusProcheComponent } from './components/centre-plus-proche/centre-plus-proche.component';
import { CentresComponent } from './components/centres/centres.component';
import { ContactComponent } from './components/contact/contact.component';
import { RendezVousComponent } from './components/rendez-vous/rendez-vous.component';
import { ServiceComponent } from './components/service/service.component';
import { TarifsComponent } from './components/tarifs/tarifs.component';
import { DetailsComponent } from './components/details/details.component';
import { ListCentresComponent } from './components/list-centres/list-centres.component';
import { PlusDetailVisitetechComponent } from "./components/plus-detail-visitetech/plus-detail-visitetech.component";
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { ReclamationDetaillComponent } from './components/reclamation-detaill/reclamation-detaill.component';
import { ConseilsDeSecuriteComponent } from './components/conseils-de-securite/conseils-de-securite.component';
import { ControleTechniqueComponent } from './components/controle-technique/controle-technique.component';
import { TitreDePropeieteComponent } from './components/titre-de-propeiete/titre-de-propeiete.component';
import { PeriodeComponent } from './components/periode/periode.component';
import { OuvrirCentreComponent } from './components/ouvrir-centre/ouvrir-centre.component';
import { ListSliderCentreComponent } from './components/list-slider-centre/list-slider-centre.component';



const routes: Routes = [
  { path:'', component: AccueilComponent },
  { path:'Centres', component: CentresComponent },
  { path:'Services', component: ServiceComponent },
  { path:'Contact', component: ContactComponent },
  { path:'Centre-plus-proche', component: CentrePlusProcheComponent },
  { path:'Rendez-vous', component: RendezVousComponent },
  { path:'Center-details',component:DetailsComponent},
  { path:'List-centres',component:ListCentresComponent},
  { path:'plus-details',component:PlusDetailVisitetechComponent},
  { path:'Tarifs',component:TarifsComponent},
  { path:'Reclamation',component:ReclamationComponent},
  { path:'Reclamation/:id',component:ReclamationDetaillComponent,},
  { path:'Conseils-de-securite',component:ConseilsDeSecuriteComponent },
  { path:'ControleTechnique',component:ControleTechniqueComponent },
  { path:'Titre-de-propriété',component:TitreDePropeieteComponent },
  { path:'Périodicité',component:PeriodeComponent },
  { path:'ouvrir-centre-visite-technique-maroc',component:OuvrirCentreComponent },
  {path:'List-slider-center',component:ListSliderCentreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
