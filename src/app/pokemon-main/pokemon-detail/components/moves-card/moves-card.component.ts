import { Component, OnInit, Input } from '@angular/core';
import { Move } from 'src/app/pokemon-main/pokemon.model';
import { TitleCasePipe } from '@angular/common';
import { RowHeading } from '../../shared/list/list.component';

@Component({
  selector: 'app-moves-card',
  templateUrl: './moves-card.component.html',
  styleUrls: ['./moves-card.component.css'],
  providers: [TitleCasePipe]
})
export class MovesCardComponent implements OnInit {
  @Input()
  layoutGrid: boolean;
  
  @Input() set moves(value: Move[]) {
    this.moveData = value.map(m => this.extractMoveData(m));
  }

  getAccuracyColor = accuracy => {
    let accuracyColor = '';
    const accuracyValue = accuracy.substring(0, accuracy.length - 1);
    switch (true) {
      case +accuracyValue > 75:
        accuracyColor = '#23BA26';
        break;
      case +accuracyValue > 50:
        accuracyColor = '#ED9349';
        break;
      case +accuracyValue > 0:
        accuracyColor = '#ED4954';
        break;
      default:
        accuracyColor = '#4F5C69';
        break;
    }
    return { color: accuracyColor, 'font-weight': '900' };
  };

  moveData: any[];
  headings: RowHeading[] = [
    { name: 'name' },
    { name: 'type', style: () => ({ 'font-weight': '900' }) },
    { name: 'power' },
    { name: 'accuracy', style: this.getAccuracyColor },
    { name: 'pp' }
  ];

  constructor(private titleCasePipe: TitleCasePipe) {}

  ngOnInit() {}

  private extractMoveData(move) {
    const { name, type, power, accuracy, pp } = move;
    return {
      name: this.titleCasePipe.transform(name),
      type: this.titleCasePipe.transform(type.name),
      power: !!power ? power : '-',
      accuracy: !!accuracy ? `${accuracy}%` : '-',
      pp
    };
  }
}
