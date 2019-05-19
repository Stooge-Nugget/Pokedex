import { Component, OnInit, Input } from '@angular/core';
import { EvolutionChain } from 'src/app/pokemon-main/pokemon.model';

@Component({
  selector: 'app-evolution-card',
  templateUrl: './evolution-card.component.html',
  styleUrls: ['./evolution-card.component.css']
})
export class EvolutionCardComponent implements OnInit {
  @Input()
  evolutionChain: EvolutionChain[];

  constructor() {}

  ngOnInit() {}
}
