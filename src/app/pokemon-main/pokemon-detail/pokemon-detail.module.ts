import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokemonCardComponents } from './components';
import { DetailCardComponent } from './shared/detail-card/detail-card.component';
import { StatefulDetailCardComponent } from './shared/stateful-detail-card/stateful-detail-card.component';
import { ListComponent } from './shared/list/list.component';

@NgModule({
  declarations: [
    PokemonDetailComponent,
    DetailCardComponent,
    StatefulDetailCardComponent,
    ListComponent,
    ...PokemonCardComponents
  ],
  imports: [CommonModule],
  exports: [PokemonDetailComponent]
})
export class PokemonDetailModule { }
