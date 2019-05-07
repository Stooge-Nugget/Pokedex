import { NgModule } from '@angular/core';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule, MatPaginatorModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonApiService } from './pokemon.service';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';

@NgModule({
    declarations: [
        PokemonListComponent,
        PokemonCardComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatProgressBarModule,
    ],
    exports: [PokemonListComponent],
    providers: [PokemonApiService]
})
export class PokemonMainModule { }
