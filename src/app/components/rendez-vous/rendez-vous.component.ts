import {Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StepperErrorsExampleComponent } from "../stepper-errors-example/stepper-errors-example.component";


@Component({
    selector: 'app-rendez-vous',
    templateUrl: './rendez-vous.component.html',
    styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent {
  constructor(private _formBuilder: FormBuilder) {}
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  
}