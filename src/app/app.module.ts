import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { ServiceComponent } from './components/service/service.component';
import { TeamComponent } from './components/team/team.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { CentrePlusProcheComponent } from './components/centre-plus-proche/centre-plus-proche.component';
import { ContactComponent } from './components/contact/contact.component';
import { CardServiceComponent } from './components/card-service/card-service.component';
import { CentresComponent } from './components/centres/centres.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './components/details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for PrimeNG
import { ToastModule } from 'primeng/toast';
import { ButtonModule} from  'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { TabMenuModule } from 'primeng/tabmenu';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import { VideoYoutubeComponent } from './components/video-youtube/video-youtube.component';
import { CommonModule,DatePipe} from '@angular/common';
import { ListCentresComponent } from './components/list-centres/list-centres.component';
import { RatingModule } from 'primeng/rating';
import { InformationComponent } from './components/information/information.component';
import { SliderDetailComponent } from './components/slider-detail/slider-detail.component';
import { PlusDetailVisitetechComponent } from './components/plus-detail-visitetech/plus-detail-visitetech.component';
import { TarifsComponent } from './components/tarifs/tarifs.component';
import { SearshComponent } from './components/searsh/searsh.component';
import { StepperErrorsExampleComponent } from './components/stepper-rendez-vous/stepper-errors-example.component';
import { RendezVousComponent } from './components/rendez-vous/rendez-vous.component';

import { StepersReclamationComponent } from './components/stepers-reclamation/stepers-reclamation.component';
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { ReclamationDetaillComponent } from './components/reclamation-detaill/reclamation-detaill.component';
import { ConseilsDeSecuriteComponent } from './components/conseils-de-securite/conseils-de-securite.component';
import { ControleTechniqueComponent } from './components/controle-technique/controle-technique.component';
import { TitreDePropeieteComponent } from './components/titre-de-propeiete/titre-de-propeiete.component';
import { PeriodeComponent } from './components/periode/periode.component';
import { OuvrirCentreComponent } from './components/ouvrir-centre/ouvrir-centre.component';
import { ListSliderCentreComponent } from './components/list-slider-centre/list-slider-centre.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';




const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'Centres', component: CentresComponent },
  { path: 'Services', component: ServiceComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'Centre-plus-proche', component: CentrePlusProcheComponent },
  { path: 'Rendez-vous', component: RendezVousComponent },
  { path:' plus-details',component:PlusDetailVisitetechComponent},
  { path:' Tarifs',component:TarifsComponent },
  { path:' Reclamation',component:ReclamationComponent },
  { path:' Conseils-de-securite',component:ConseilsDeSecuriteComponent },
  { path:' Reclamation/:id',component:ReclamationDetaillComponent },
  { path:' ControleTechnique',component:ControleTechniqueComponent },
  { path:' Titre-de-propriété',component:TitreDePropeieteComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    ServiceComponent,
    TeamComponent,
    FooterComponent,
    RendezVousComponent,
    CentrePlusProcheComponent,
    ContactComponent,
    CardServiceComponent,
    CentresComponent,
    AccueilComponent,
    DetailsComponent,
    FeedbacksComponent,
    VideoYoutubeComponent,
    ListCentresComponent,
    InformationComponent,
    SliderDetailComponent,
    SearshComponent,
    RendezVousComponent,
    ReclamationComponent,
    ReclamationDetaillComponent,
    ConseilsDeSecuriteComponent,
    ControleTechniqueComponent,
    TitreDePropeieteComponent,
    PeriodeComponent,
    OuvrirCentreComponent,
    ListSliderCentreComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    StepperErrorsExampleComponent,
    BrowserModule,
    RouterModule.forChild(routes),
    ButtonModule,
    ToastModule,
    TabMenuModule,
    MessagesModule,
    CommonModule,
    RatingModule,
    StepersReclamationComponent,
    SweetAlert2Module.forRoot()
   
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }


