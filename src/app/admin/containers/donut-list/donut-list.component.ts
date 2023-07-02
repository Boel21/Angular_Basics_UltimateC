import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DonutCardComponent } from '../../componets/donut-card/donut-card.component';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../service/donut.service';

@Component({
  standalone: true,
  imports: [RouterModule, DonutCardComponent, NgIf, NgFor],
  providers: [DonutService],
  selector: 'donut-list',
  template: `
    <div>
      <div class="donut-list-actions">
        <a routerLink="new" class="btn btn--green">
          New Donut
          <img src="/assets/img/icon/plus.svg" alt="" />
        </a>
      </div>

      <ng-container
        *ngIf="donuts.length; then cards; else nothing"
      ></ng-container>

      <ng-template #cards>
        <donut-card
          *ngFor="let donut of donuts; trackBy: trackById"
          [donut]="donut"
        ></donut-card>
      </ng-template>
      <ng-template #nothing>
        <p>No Donuts here...</p>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .donut-list {
        &-actions {
          margin-bottom: 10px;
        }
      }
    `,
  ],
})
export class DonutListComponent implements OnInit {
  donuts: Donut[] = [];

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
