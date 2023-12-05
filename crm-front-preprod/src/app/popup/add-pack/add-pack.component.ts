import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-pack',
  templateUrl: './add-pack.component.html',
  styleUrls: ['./add-pack.component.scss']
})
export class AddPackComponent implements OnInit {
  addPackForm: FormGroup;

  constructor(private apiService: ApiService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<AddPackComponent>) {
    this.addPackForm = new FormGroup({
      pack_name: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(4)]),
      socialAccounts: new FormControl(0, [, Validators.required]),
      users: new FormControl(0, [Validators.required]),
      benchmarks: new FormControl(0, [, Validators.required]),
      annualSubscription: new FormControl(0, [, Validators.required]),
      maxFansNumber: new FormControl(0, [, Validators.required]),
      dataHistoryYears: new FormControl(0, [, Validators.required]),
      dashboard: new FormControl(false, [, Validators.required]),
      audienceInsights: new FormControl(false, [, Validators.required]),
      trendengagementreports: new FormControl(false, [, Validators.required]),
      customBenchmark: new FormControl(false, [, Validators.required]),
      nationalReports: new FormControl(false, [, Validators.required]),
      competitorContentCuration: new FormControl(false, [, Validators.required]),
      emailReports: new FormControl(false, [, Validators.required]),
      brandingDesign: new FormControl(false, [, Validators.required]),
      mouthlySubcription: new FormControl(0, [, Validators.required]),
      addPage: new FormControl(0, [, Validators.required]),
      addUser: new FormControl(0, [, Validators.required]),
      addBenchmark: new FormControl(0, [, Validators.required]),

    });
}

  ngOnInit() {

    console.log(this.addPackForm);
    this.addPackForm.valueChanges.subscribe(value => {
      value.benchmarks = {max_have : value.benchmarks , deletes: value.benchmarks};
      value.socialAccounts = {max_have : value.socialAccounts , deletes: value.socialAccounts};
      value.dataHistoryYears = value.dataHistoryYears + 'YEAR';
   //   console.log(value);

    });

  }
  addPack() {
    if (this.addPackForm.invalid){
      this.snackBar.open('please verify the form');
    } else {
    console.log(this.addPackForm.value);
    this.apiService.apiPost('pack/add', this.addPackForm.value).subscribe(response => {
      console.log(response);
    });
    this.dialogRef.close();
    }
  }
  onReset() {
    this.dialogRef.close();
   }
}
