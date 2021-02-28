import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'button-view',
  template: `
    <div class="d-flex flex-nowrap text-white">
      <button type="button" class="btn btn-danger mr-2" (click)="delete()">
        <i class="fas fa-trash-alt"></i>
      </button>
      <button type="button" class="btn btn-info" (click)="edit()">
        <i class="fas fa-edit"></i>
      </button>
    </div>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string = "";

  @Input() value: string ="";
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  delete() {
    console.log('Deleting', this.rowData.id);
    this.save.emit(this.rowData);
  }
  edit() {
    console.log('Editing', this.rowData.id);
    this.save.emit(this.rowData);
  }
}