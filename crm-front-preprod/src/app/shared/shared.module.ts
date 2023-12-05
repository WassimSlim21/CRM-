import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { ChartsModule } from 'ng2-charts';
import { UserStatsModule } from '../pages/user-stats/user-stats.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChartsModule,
    UserStatsModule,
  ],
  exports: [
    UserStatsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    ChartsModule
  ],
})
export class SharedModule {}
