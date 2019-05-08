import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemon-main/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-main/pokemon-detail/pokemon-detail.component';
import { PokemonResolver } from './pokemon-main/pokemon.resolver';

const routes: Routes = [
  { path: 'pokemon', component: PokemonListComponent },
  {
    path: 'pokemon/:id',
    component: PokemonDetailComponent,
    resolve: {
      pokemonData: PokemonResolver
    }
  },
  {
    path: '',
    redirectTo: '/pokemon',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PokemonResolver]
})
export class AppRoutingModule { }
