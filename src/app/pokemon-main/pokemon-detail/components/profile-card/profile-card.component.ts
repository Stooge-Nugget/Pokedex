import { Component, Input, ViewChild } from '@angular/core';
import { Pokemon, getTypeColour } from 'src/app/pokemon-main/pokemon.model';
import { BreakpointService } from 'src/app/breakpoint.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {
  @ViewChild('svgContainer') svgContainer: any;

  @Input()
  layoutGrid: boolean;

  @Input()
  species: any;

  @Input()
  description: string;

  @Input()
  set pokemon(value: Pokemon) {
    this.pokemonData = value;
    this.abilities = value.abilities.map(a => a.ability.name).join(', ');
    const types = value.types
      .sort((a, b) => a.slot < b.slot ? -1 : a.slot > a.slot ? 1 : 0)
      .map(t => t.type);
    this.typeOne = getTypeColour(types[0]);
    this.typeTwo = !!types[1] ? getTypeColour(types[1]) : null;
  };

  get pokemon() {
    return this.pokemonData;
  }

  abilities;
  typeOne = 'white';
  typeTwo = 'white';
  isXSmall = false;

  private smallBreakpointSub: Subscription;
  private pokemonData: Pokemon;

  constructor(private breakpointSvc: BreakpointService) { }

  ngOnInit() {
    this.smallBreakpointSub = this.breakpointSvc.isXSmall$.subscribe(isXSmall => this.isXSmall = isXSmall);
  }

  ngOnDestroy(): void {
    this.smallBreakpointSub.unsubscribe();
  }

  // Nothing to see here...

  // Add colour variation
  // Add random outer spiral based plots
  // Different shapes
  // private createSvgBackground() {
  //   const ns = 'http://www.w3.org/2000/svg';
  //   // const circle = document.createElementNS(ns, 'circle');
  //   const svgContainer = this.svgContainer.nativeElement;
  //   const rand = this.seededRand(this.pokemon.id);
  //   const shapes: any[] = [];
  //   const shapeCount = 20;
  //   const limit = 1000;
  //   let failSafe = 0;

  //   while (shapes.length < shapeCount && !(failSafe >= limit)) {
  //     const shape = document.createElementNS(ns, 'circle');
  //     const radius = this.random(1, 5);
  //     const padding = radius * 2;
  //     shape.setAttribute('cx', this.random(padding, (100 - padding)).toString());
  //     shape.setAttribute('cy', this.random(padding, (100 - padding)).toString());
  //     shape.setAttribute('r', radius.toString());
  //     shape.setAttribute('fill', 'blue');

  //     let overlapping = false;
  //     for (let i = 0; i < shapes.length; i++) {
  //       const currShape = shapes[i];
  //       const x = +shape.getAttribute('cx') - +currShape.getAttribute('cx');
  //       const y = +shape.getAttribute('cy') - +currShape.getAttribute('cy');
  //       const dist = Math.sqrt(x * x + y * y);
  //       if (dist < +shape.getAttribute('r') + +currShape.getAttribute('r')) {
  //         overlapping = true;
  //       };
  //     }

  //     if (!overlapping) {
  //       shapes.push(shape);
  //     }

  //     failSafe++;
  //   }

  //   shapes.forEach(s => {
  //     svgContainer.appendChild(s);
  //   })
  // }

  // seededRand(seed: number, digits = 10000) {
  //   var num = Math.sin(seed++) * digits;
  //   return num - Math.floor(num);
  // }

  // random(low: number, high: number) {
  //   return Math.floor(Math.random() * (high - low)) + low;
  // }

}
