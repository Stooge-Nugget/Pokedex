import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-detail-card',
    templateUrl: './detail-card.component.html',
    styleUrls: ['./detail-card.component.css']
})
export class DetailCardComponent {
    @Input() heading: string;
    @Input() width = 'auto';
    @Input() height = 'auto';
    @Input() gridStyle = false;

    getClass = () => !this.gridStyle ? 'pokemon-card' : 'pokemon-card-grid-style';

}
