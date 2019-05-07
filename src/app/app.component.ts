import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from './pokemon-main/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  logoSrc = 'https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg';
  opened = false;

  constructor(private pokemonApiSvc: PokemonApiService) {
  }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.opened = !this.opened;
  }
}