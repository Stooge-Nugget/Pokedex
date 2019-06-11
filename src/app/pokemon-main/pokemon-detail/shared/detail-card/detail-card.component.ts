import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-detail-card',
    templateUrl: './detail-card.component.html',
    styleUrls: ['./detail-card.component.scss']
})
export class DetailCardComponent {
    @Input() heading: string;
    @Input() width = 'auto';
    @Input() minHeight = 'auto';
    @Input() gridStyle = false;

    getClass = () => !this.gridStyle ? 'pokemon-card' : 'pokemon-card-grid-style';

}
