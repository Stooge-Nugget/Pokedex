import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule, MatPaginatorModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonApiService } from './pokemon.service';
import { PokemonCardComponent } from './pokemon-list/pokemon-card/pokemon-card.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    declarations: [
        PokemonListComponent,
        PokemonCardComponent,
        PokemonDetailComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatCardModule
        
    ],
    exports: [PokemonListComponent, PokemonDetailComponent],
    providers: [PokemonApiService]
})
export class PokemonMainModule { }
