import { Component, OnInit, Input } from '@angular/core';
import { EvolutionChain } from 'src/app/pokemon-main/pokemon.model';
import { BreakpointService } from 'src/app/breakpoint.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-evolution-card',
  templateUrl: './evolution-card.component.html',
  styleUrls: ['./evolution-card.component.scss']
})
export class EvolutionCardComponent implements OnInit {
  @Input()
  layoutGrid: boolean;

  @Input()
  evolutionChain: EvolutionChain[];

  isXSmall = false;
  private smallBreakpointSub: Subscription;

  constructor(private breakpointSvc: BreakpointService) { }

  ngOnInit() {
    this.smallBreakpointSub = this.breakpointSvc.isXSmall$.subscribe(isXSmall => this.isXSmall = isXSmall);
  }

  ngOnDestroy(): void {
    this.smallBreakpointSub.unsubscribe();
  }
}
