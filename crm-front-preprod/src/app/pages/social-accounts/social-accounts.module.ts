import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialAccountsRoutingModule } from './social-accounts-routing.module';
import { SocialAccountsComponent } from './social-accounts.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  declarations: [SocialAccountsComponent],
  imports: [
    ReactiveFormsModule, FormsModule,
    MaterialModule,
    CommonModule,
    SocialAccountsRoutingModule
  ]
})
export class SocialAccountsModule { }
