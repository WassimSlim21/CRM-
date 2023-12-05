import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BugRoutingModule } from './bug-routing.module';
import { BugComponent } from './bug.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  declarations: [BugComponent],
  imports: [
    CommonModule,
    BugRoutingModule,
    MaterialModule,
    DragDropModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }, ],
})
export class BugModule { }
