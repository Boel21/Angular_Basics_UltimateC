import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../service/donut.service';

@Component({
  selector: 'donut-list',
  template: `
    <div>
      <ng-container
        *ngIf="donuts.length; then cards; else nothing"
      ></ng-container>

      <ng-template #cards>
        <donut-card
          *ngFor="let donut of donuts; trackBy: trackById"
          [donut]="donut"
        ></donut-card>
      </ng-template>

      <div
        *ngFor="
          let donut of donuts;
          trackBy: trackById;
          index as i;
          odd as o;
          even as e
        "
        [style.color]="e ? 'red' : 'blue'"
      >
        {{ i }}
        {{ o }}
        {{ e }}
      </div>

      <ng-template ngFor [ngForOf]="donuts" let-donut let-1="index">
        <donut-card [donut]="donut"></donut-card>
      </ng-template>

      <ng-template #nothing>
        <p>No Donuts here...</p>
      </ng-template>
    </div>
  `,
  styles: [],
})
export class DonutListComponent implements OnInit {
  donuts!: Donut[];

  constructor(private donutService: DonutService) {}

  ngOnInit(): void {
    this.donutService
      .read()
      .subscribe((donuts: Donut[]) => (this.donuts = donuts));
  }

  trackById(index: Number, value: Donut) {
    return value.id;
  }
}
