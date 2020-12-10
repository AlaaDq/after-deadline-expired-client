import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';

import {MatListModule} from '@angular/material/list';

import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule
  } from '@angular-material-components/datetime-picker';
  
const mm = [
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatListModule,

    
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
]

@NgModule({
  declarations: [],
  imports: [ CommonModule
            ,...mm ],
  exports: [...mm]
})
export class MatrialModule { }
