import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DonutFormComponent } from '../../componets/donut-form/donut-form.component';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../service/donut.service';

@Component({
  standalone: true,
  imports: [DonutFormComponent],
  providers: [DonutService],
  selector: 'donut-single',
  template: `
    <p>
      <donut-form
        [donut]="donut"
        [isEdit]="isEdit"
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
  isEdit!: Boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private donutService: DonutService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.donutService
      .readOne(id)
      .subscribe((donut: Donut) => (this.donut = donut));

    this.isEdit = this.route.snapshot.data['isEdit'];
  }

  onCreate(donut: Donut) {
    this.donutService.create(donut).subscribe((donut) => {
      this.router.navigate(['admin', 'donut', donut.id]);
    });
  }

  onUpdate(donut: Donut) {
    this.donutService.update(donut).subscribe({
      next: () => this.router.navigate(['admin']),
      error: (err) => console.log('onUpdate error', err),
    });
  }

  onDelete(donut: Donut) {
    this.donutService.delete(donut).subscribe(() => {
      this.router.navigate(['admin']);
    });
  }
}
