import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserStatsRoutingModule } from './user-stats-routing.module';
import { UserStatsComponent } from './user-stats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [UserStatsComponent],
  imports: [
    UserStatsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    ChartsModule
  ],
  exports: [UserStatsComponent]
})
export class UserStatsModule { }
