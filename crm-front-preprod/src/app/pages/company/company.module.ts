import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { CompanyUsersComponent } from 'src/app/popup/company-users/company-users.component';


@NgModule({
  declarations: [CompanyComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
  ],
  entryComponents:
  [
    ],
})
export class CompanyModule { }
