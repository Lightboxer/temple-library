
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Item } from 'tinystock-models';
import { ApiService } from '../services/api.service';
import { startWith, map } from 'rxjs/operators'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddItemModalComponent } from '../add-item/add-item-modal/add-item-modal.component';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss']
})
export class ItemSearchComponent implements OnInit, AfterViewInit {
  @Input() buttonText: string = 'Add'
  @Input() submitting: boolean = false
  @Input() reset: Observable<void> | null = null
  @Output() error = new EventEmitter<any>()
  @Output() item = new EventEmitter<{ item: Item, quantityAvailable: number }>()
  @ViewChild('codeInput') codeInput: ElementRef

  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  addDialog: MatDialogRef<AddItemModalComponent, any> | null = null

  itemForm = new FormGroup({
    item: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
  })

  items: Item[] = []

  loading: boolean = false

  filteredOptions: Observable<Item[]>

  selectedItem: Item | null = null

  loadItems() {
    this.itemForm.controls['item'].disable()
    this.loading = true
    this.apiService.items().then(items => {
      this.items = items
      this.itemForm.controls['item'].enable()
      this.itemForm.controls['item'].setValue('')
      this.codeInput?.nativeElement?.focus()
      this.loading = false
    }).catch(err => {
      this.loading = false
      this.itemForm.controls['item'].enable()
      this.error.emit(err)
    })
  }

  addItem() {
    if (!this.addDialog) {
      this.addDialog = this.dialog.open(AddItemModalComponent)
      this.addDialog.afterClosed().subscribe(() => {
        this.loadItems()
        this.addDialog = null
      })
    } else {
      this.addDialog.close()
    }
  }