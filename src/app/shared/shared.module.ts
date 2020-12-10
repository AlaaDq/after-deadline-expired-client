import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  ReactiveFormsModule } from "@angular/forms";
import { MatrialModule} from '../matrial/matrial.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatrialModule
    // FormsModule,
  ],
  exports:[ReactiveFormsModule,MatrialModule]
})
export class SharedModule { }
