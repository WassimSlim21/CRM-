import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceAdministarteurRoutingModule } from './espace-administarteur-routing.module';
import { EspaceAdministarteurComponent } from './espace-administarteur.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@NgModule({
  declarations: [EspaceAdministarteurComponent],
  imports: [
    CommonModule,
    EspaceAdministarteurRoutingModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }, ],
})
export class EspaceAdministarteurModule { }
