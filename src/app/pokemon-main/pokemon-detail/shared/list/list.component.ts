import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() heading: string;

  @Input() set rowHeadings(value: RowHeading[]) {
    this.headings = value;
    this.fieldWidth = !!this.headings ? `${100 / this.headings.length}%` : '';
  }

  get rowHeadings() {
    return this.headings;
  }

  // Data objects in array should contains properties matching the headings
  @Input() set data(value: any[]) {
    this.dataRows = !!value
      ? value.map((data, index) =>
          this.extractData(data, index, this.headings.map(h => h.name))
        )
      : [];
  }

  fieldWidth: string;
  dataRows: DataRowMap[][];
  selectedHeading = '';

  private headings: RowHeading[];
  private acdc: 'Ascend' | 'Descend' | 'Original' = 'Original';

  setColumnStyle(fieldName: string, value?: any) {
    const width = { width: this.fieldWidth };
    const heading = this.headings.find(h => h.name === fieldName && !!h.style);
    return !!fieldName && !!heading
      ? { ...heading.style(value), ...width }
      : width;
  }

  handleClickSort(fieldName: string) {
    this.selectedHeading = fieldName;
    switch (this.acdc) {
      case 'Original':
        this.dataRows = this.dataRows.sort((a, b) =>
          this.sortRowFieldValue(a, b, fieldName)
        );
        this.acdc = 'Ascend';
        break;
      case 'Ascend':
        this.dataRows = this.dataRows.sort((a, b) =>
          this.sortRowFieldValue(b, a, fieldName)
        );
        this.acdc = 'Descend';
        break;
      case 'Descend':
        this.dataRows = this.dataRows.sort((a, b) =>
          this.sortRowOrderId(a, b, fieldName)
        );
        this.acdc = 'Original';
        break;
    }
  }

  getArrayClass() {
    return this.acdc === 'Ascend'
      ? 'arrow-up'
      : this.acdc === 'Descend'
      ? 'arrow-down'
      : '';
  }

  private sortRowFieldValue(a: DataRowMap[], b: DataRowMap[], field: string) {
    const valueA = a.find(value => value.fieldId === field).value;
    const valueB = b.find(value => value.fieldId === field).value;
    return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
  }

  private sortRowOrderId(a: DataRowMap[], b: DataRowMap[], field: string) {
    const valueA = a.find(value => value.fieldId === field).orderId;
    const valueB = b.find(value => value.fieldId === field).orderId;
    return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
  }

  private extractData(
    data,
    rowNumber: number,
    headings: string[]
  ): DataRowMap[] {
    const result = [];

    if (!headings || headings.length === 0) {
      return result;
    }

    for (var key in data) {
      if (headings.some(h => h === key)) {
        result.push({ value: data[key], orderId: rowNumber, fieldId: key });
      }
    }
    return result;
  }
}

export interface RowHeading {
  name: string;
  style?: (value?: any) => { [key: string]: string };
}

interface DataRowMap {
  value: any;
  orderId: number;
  fieldId: string;
}
