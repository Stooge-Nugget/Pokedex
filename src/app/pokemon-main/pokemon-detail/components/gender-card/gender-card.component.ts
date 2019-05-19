import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-gender-card',
    templateUrl: './gender-card.component.html',
    styleUrls: ['./gender-card.component.css']
})
export class GenderCardComponent {
    @Input()
    genderRatio: { male: number, female: number };
}
