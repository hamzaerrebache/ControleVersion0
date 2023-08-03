import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ServiceComponent } from './components/service/service.component';
import { TeamComponent } from './components/team/team.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { CentrePlusProcheComponent } from './components/centre-plus-proche/centre-plus-proche.component';
import { ContactComponent } from './components/contact/contact.component';
import { CardServiceComponent } from './components/card-service/card-service.component';
import { CentresComponent } from './components/centres/centres.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { SearshComponent } from './components/searsh/searsh.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './components/details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for PrimeNG
import { ToastModule } from 'primeng/toast';
import{ButtonModule} from  'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { TabMenuModule } from 'primeng/tabmenu';
import {Router} from '@angular/router';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import { VideoYoutubeComponent } from './components/video-youtube/video-youtube.component';


const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'Centres', component: CentresComponent },
  { path: 'Services', component: ServiceComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'Centre-plus-proche', component: CentrePlusProcheComponent },
  { path: 'Rendez-vous', component: ReservationComponent },
  {path:'searsh',component:SearshComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    AboutUsComponent,
    ServiceComponent,
    TeamComponent,
    FooterComponent,
    ReservationComponent,
    CentrePlusProcheComponent,
    ContactComponent,
    CardServiceComponent,
    CentresComponent,
    AccueilComponent,
    SearshComponent,
    DetailsComponent,
    FeedbacksComponent,
    VideoYoutubeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forChild(routes),
    ButtonModule,
    ToastModule,
    TabMenuModule,
    MessagesModule

    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
