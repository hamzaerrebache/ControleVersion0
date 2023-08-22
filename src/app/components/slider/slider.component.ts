import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit{
  formData!:FormGroup;
  
  constructor(private fb:FormBuilder,private router:Router){

  }
  ngOnInit(): void {
    this.formData = this.fb.group({
      data: {value:'',disabled:false}
    });

  
  }

  onSubmit(){
    this.router.navigate(['List-slider-center'], {
      queryParams: { data: this.formData.value.data }
    });
   
    console.log(this.formData.value.data)
    this.formData.reset();

  }

}
