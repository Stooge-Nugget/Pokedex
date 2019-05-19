import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokemonCardComponents } from './components';
import { DetailCardComponent } from './shared/detail-card/detail-card.component';

@NgModule({
    declarations: [PokemonDetailComponent, DetailCardComponent, ...PokemonCardComponents],
    imports: [
        CommonModule
    ],
    exports: [PokemonDetailComponent]
})
export class PokemonDetailModule { }
