import { CommonModule } from '@angular/common';
import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config.component';
import { NgModule } from '@angular/core';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { MaterialModule } from 'src/app/shared/material.module';
import { AceEditorModule } from 'ng2-ace-editor';




@NgModule({
  declarations: [ConfigComponent],
  imports: [
    NgJsonEditorModule,
    CommonModule,
    ConfigRoutingModule,
    MaterialModule,
    AceEditorModule

  ]
})
export class ConfigModule { }
