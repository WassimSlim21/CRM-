import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BenchmarksRoutingModule } from './benchmarks-routing.module';
import { BenchmarksComponent } from './benchmarks.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@NgModule({
  declarations: [BenchmarksComponent],
  imports: [
    CommonModule,
    BenchmarksRoutingModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }, ],
})
export class BenchmarksModule { }
