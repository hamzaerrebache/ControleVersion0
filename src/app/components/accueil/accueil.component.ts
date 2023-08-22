import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Center } from 'src/app/models/Center.model';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent  implements OnInit{
  
  ngOnInit(): void {
    localStorage.removeItem('selectedCentreId');
  }
  searchResults !:Center[];

  // Method to receive the search results from the Navbar component
  onSearchResult(results: any[]) {
    this.searchResults = results;
  }

}
