
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../services/api.service';
import { ErrorService } from '../services/error.service';
import { Subscription } from 'rxjs';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

  @ViewChild('price') priceElement: ElementRef;

  constructor(private apiService: ApiService, private errorService: ErrorService, private route: ActivatedRoute, private location: Location) { }

  loading = false

  subscriptions: Subscription[] = []

  editItemForm = new FormGroup({
    code: new FormControl({ value: '', disabled: true }, Validators.required),
    setQuantity: new FormControl({ value: null, disabled: true }),
    description: new FormControl({ value: '', disabled: this.loading }, Validators.required),
    quantity: new FormControl({ value: '', disabled: true }, Validators.required),
    category: new FormControl({ value: '', disabled: this.loading }, Validators.required),
    cost: new FormControl({ value: '', disabled: this.loading }, Validators.required),
    price: new FormControl({ value: '', disabled: this.loading }, Validators.required),
  });

  ngOnInit() {
    setTimeout(() => {
      this.priceElement.nativeElement.focus()
    })
    this.subscriptions.push(this.route.queryParams.subscribe(params => {
      if (!params.code) {
        this.errorService.showSimpleSnackBar('Code not specified')
        this.location.back()
      }
      this.loading = true
      this.apiService.findItem(params.code, params.setQuantity ? params.setQuantity : null).then(item => {
        this.editItemForm.controls['code'].setValue(item.code)
        this.editItemForm.controls['setQuantity'].setValue(item.setQuantity)
        this.editItemForm.controls['description'].setValue(item.description)
        this.editItemForm.controls['quantity'].setValue(item.quantity)
        this.editItemForm.controls['category'].setValue(item.category)
        this.editItemForm.controls['cost'].setValue(item.cost)
        this.editItemForm.controls['price'].setValue(item.price)
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.errorService.showError(err)
        this.location.back()
      })
    }))
  }

  edit() {
    if (this.editItemForm.valid && !this.loading) {
      if ((!this.editItemForm.controls['setQuantity'].value || this.editItemForm.controls['setQuantity'].value > 0) && this.editItemForm.controls['price'].value >= 0 && this.editItemForm.controls['cost'].value >= 0) {
        this.loading = true
        let item: any = this.editItemForm.value
        item.code = this.editItemForm.controls['code'].value
        item.quantity = this.editItemForm.controls['quantity'].value
        item.setQuantity = this.editItemForm.controls['setQuantity'].value
        this.apiService.editItem(item).then(() => {
          this.loading = false
          this.errorService.showSimpleSnackBar('Saved')
        }).catch(err => {
          this.loading = false
          this.errorService.showError(err)
        })
      }
    }
  }

  delete() {
    if (confirm('Are you sure you want to delete this item?')) {
      this.loading = true
      this.apiService.deleteItem(this.editItemForm.controls['code'].value, this.editItemForm.controls['setQuantity'].value).then(() => {
        this.loading = false
        this.errorService.showSimpleSnackBar('Deleted')
        this.back()
      }).catch(err => {
        this.loading = false
        this.errorService.showError(err)
      })
    }
  }

  back() {
    this.location.back()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}