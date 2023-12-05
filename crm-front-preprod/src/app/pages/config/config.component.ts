import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { ApiService } from 'src/app/core/service/api.service';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  @ViewChild('editor', { static: true }) editor: JsonEditorComponent;

  showData;

  options = new JsonEditorOptions();
  files: any ;
  selected: any = null;
  data: any ;


  text: String = '';
  optionsNonJsonEditor: any = {maxLines: 1000, printMargin: false};


  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    this.options.mode = 'code';
    this.options.modes = ['code', 'text', 'tree', 'view'];
    this.options.statusBar = false;
    this.options.onChange = () => {
     // console.log(`onChange 1`, this.editor.get());
    //  this.data = this.editor.get();
    console.log(this.editor.get());

    };

  }

  showJson(d) {
    return JSON.stringify(d, null, 2);
  }

  changeLog(event = null) {
   // this.showData = this.editor.get();
   // console.log(this.showData);

  }
  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles() {
    this.apiService.apiGetAll('layout/names').subscribe( (response: any) => {
      this.files = response ;
    });
  }

  loadFile() {
    this.apiService.apiGetAll(`layout/${this.selected}`).subscribe( (response: any) => {
      this.text = response.data;
      this.data = JSON.parse(response.data) ;

    });
  }

  updateFile() {
    let newFile ;
    if (this.isAjsonFile(this.selected)) {
     newFile = this.editor.get();
    } else {
      newFile = this.text;

    }
    this.apiService.apiPost(`layout/${this.selected}`, {newFile}).subscribe( (response: any) => {
     this.snackBar.open('Layout updated');
    });
  }



  onChange(code) {


  }

  isAjsonFile(fileName) {
    if (fileName) {
     return (fileName.indexOf('.json') !== -1);
    } else {
    return false ;
    }
  }
}
