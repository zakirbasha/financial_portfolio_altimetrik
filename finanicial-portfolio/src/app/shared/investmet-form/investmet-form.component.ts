import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  imports: [ReactiveFormsModule, DatePipe], 
  templateUrl: './investmet-form.component.html',
  styleUrl: './investmet-form.component.scss'
})
export class InvestmetFormComponent {
  dialogRef = inject(MatDialogRef<InvestmetFormComponent>);
  assetTypes = [
    { name: 'Equity', price:10000 },
    { name: 'Debt', price:20000 },
    { name: 'Real Estate', price:30000 },
    { name: 'FD', price:40000 },
    { name: 'Gold', price:50000 }
  ]
  investmentForm = new FormGroup({
    assetType: new FormControl('', [Validators.required]),
    quantity: new FormControl('0', [Validators.required, Validators.min(0)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    date: new FormControl('', [Validators.required]),
  });
  isReviewSection: boolean = false;
  onSubmit() {
    if (this.isReviewSection) {
      this.dialogRef.close(this.investmentForm.value);
    }
    this.isReviewSection = true;

  }
  closeForm() {
    this.investmentForm.reset();
    this.dialogRef.close();
  }
  update(data: string) {
    this.investmentForm.patchValue({
      assetType: data,
    });
    console.log(this.investmentForm.value);
  }
}
