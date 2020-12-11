import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatrialModule} from '../matrial/matrial.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatrialModule
    // FormsModule,
  ],
  exports:[ReactiveFormsModule,MatrialModule,FormsModule]
})
export class SharedModule { }
