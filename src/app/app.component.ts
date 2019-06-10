import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from './pokemon-main/pokemon.service';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './pokemon-main/animations';
import { SimpleStateManagementService } from './simple-state-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  logoSrc = 'https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg';
  opened = false;
  detailGridView = false;

  constructor(private pokemonApiSvc: PokemonApiService, private ssmSvc: SimpleStateManagementService) {
  }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  toggleSideNav() {
    this.opened = !this.opened;
  }

  toggleDetailGridView() {
    this.detailGridView = !this.detailGridView;
    this.ssmSvc.setDetailLayout(this.detailGridView ? 'Grid' : 'Card');
  }
}