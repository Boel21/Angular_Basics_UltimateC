import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'donut-form',
  template: `
    <form class="donut-form" #form="ngForm" *ngIf="donut; else loading">
      <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          class="input"
          required
          [ngModel]="donut.name"
          minlength="5"
          [ngModelOptions]="{ updateOn: 'blur' }"
          #nameModel="ngModel"
        />
        <ng-container *ngIf="nameModel.invalid && nameModel.touched">
          <div class="donnut-form-error" *ngIf="nameModel.errors?.required">
            Name is required.
          </div>
          <div class="donnut-form-error" *ngIf="nameModel.errors?.minlength">
            Minimun length of a name is 5!.
          </div>
        </ng-container>
      </label>

      <label>
        <span>Icon</span>
        <select
          name="icon"
          class="input input--select"
          required
          [ngModel]="donut.icon"
          #iconModel="ngModel"
        >
          <option *ngFor="let icon of icons" [ngValue]="icon">
            {{ icon }}
          </option>
        </select>
        <ng-container *ngIf="iconModel.invalid && iconModel.touched">
          <div class="donnut-form-error" *ngIf="iconModel.errors?.required">
            Icon is required.
          </div>
        </ng-container>
      </label>

      <label>
        <span>Price</span>
        <input
          type="number"
          name="price"
          class="input"
          required
          [ngModel]="donut.price"
          #priceModel="ngModel"
        />
        <ng-container *ngIf="priceModel.invalid && priceModel.touched">
          <div class="donnut-form-error" *ngIf="priceModel.errors?.required">
            Price is required.
          </div>
        </ng-container>
      </label>

      <div class="donut-form-radios">
        <p class="donut-form-radios-label">Promo:</p>
        <label>
          <input
            type="radio"
            name="promo"
            [value]="undefined"
            [ngModel]="donut.promo"
          />
          <span>None</span>
        </label>
        <label>
          <input
            type="radio"
            name="promo"
            value="new"
            [ngModel]="donut.promo"
          />
          <span>New</span>
        </label>
        <label>
          <input
            type="radio"
            name="promo"
            value="limited"
            [ngModel]="donut.promo"
          />
          <span>Limited</span>
        </label>
      </div>

      <label>
        <span>Description</span>
        <textarea
          name="description"
          class="input input--textarea"
          required
          [ngModel]="donut.description"
          #descriptionModel="ngModel"
        >
        </textarea>
        <ng-container
          *ngIf="descriptionModel.invalid && descriptionModel.touched"
        >
          <div
            class="donnut-form-error"
            *ngIf="descriptionModel.errors?.required"
          >
            Description is required.
          </div>
        </ng-container>
      </label>
      <button
        type="submit"
        class="btn btn--green"
        *ngIf="!isEdit"
        (click)="handleCreate(form)"
      >
        Create
      </button>
      <button
        type="submit"
        class="btn btn--green"
        *ngIf="isEdit"
        [disabled]="form.untouched"
        (click)="handleUpdate(form)"
      >
        Update
      </button>
      <button
        type="submit"
        class="btn btn--green"
        *ngIf="isEdit"
        (click)="handleDelete()"
      >
        Delete
      </button>
      <button
        type="button"
        class="btn btn--grey"
        *ngIf="form.touched || isEdit"
        (click)="form.resetForm()"
      >
        Reset Form
      </button>

      <div class="donut-form-working" *ngIf="form.valid && form.submitted">
        Working...
      </div>

      <!-- <pre>{{ donut | json }}</pre>
      <pre>{{ form.value | json }}</pre> -->
    </form>

    <ng-template #loading>Loading...</ng-template>
  `,
  styles: [
    `
      .donut-form {
        &-radios {
          display: flex;
          align-content: center;
          ~ &label {
            margin-right: 10px;
          }
          label {
            display: flex;
            align-items: center;
            span {
              color: #444;
              margin-bottom: 0;
            }
          }
        }
        &-working {
          font-size: 12px;
          font-style: italic;
          margin: 10px 0;
        }
        &-error {
          font-size: 12px;
          color: #e66262;
        }
      }
    `,
  ],
})
export class DonutFormComponent {
  @Input() donut!: Donut;
  @Input() isEdit!: Boolean;
  @Output() create = new EventEmitter<Donut>();
  @Output() update = new EventEmitter<Donut>();
  @Output() delete = new EventEmitter<Donut>();

  icons: string[] = [
    'caramel-swirl',
    'glazed-fudge',
    'just-chocolate',
    'sour-supreme',
    'strawberry-glaze',
    'vanilla-sundae',
    'zesty-lemon',
  ];

  constructor() {}

  handleCreate(form: NgForm) {
    if (form.valid) {
      this.create.emit(form.value);
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleUpdate(form: NgForm) {
    if (form.valid) {
      this.update.emit({ id: this.donut.id, ...form.value });
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleDelete() {
    this.delete.emit({ ...this.donut });
  }
}
