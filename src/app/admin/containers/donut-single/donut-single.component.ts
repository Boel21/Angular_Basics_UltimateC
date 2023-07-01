import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../service/donut.service';

@Component({
  selector: 'donut-single',
  template: `
    <p>
      <donut-form
        [donut]="donut"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"
      >
      </donut-form>
    </p>
  `,
  styles: [],
})
export class DonutSingleComponent implements OnInit {
  donut!: Donut;

  constructor(private donutService: DonutService) {}

  ngOnInit(): void {
    // this.donutService.readOne();
  }

  onCreate(donut: Donut) {
    this.donutService.create(donut);
  }

  onUpdate(donut: Donut) {
    this.donutService.update(donut);
  }

  onDelete(donut: Donut) {
    this.donutService.delete(donut);
  }
}
