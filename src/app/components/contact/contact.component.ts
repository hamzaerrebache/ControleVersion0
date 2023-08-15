import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public contactForm!: FormGroup;

  constructor(private http:HttpClient,private formBuilder:FormBuilder){
 

  }
  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      user_name: this.formBuilder.control('', Validators.required),
      user_email: this.formBuilder.control('', [Validators.required, Validators.email]),
      message: this.formBuilder.control('', Validators.required),
      phone:this.formBuilder.control('',Validators.required),
      agree:this.formBuilder.control(null,Validators.required)
    });
    
  }
  public sendEmail() {
    // e.preventDefault();
    // const formData = new FormData(e.target as HTMLFormElement);
   
    // Extrait les données du formulaire
    const senderName = this.contactForm.value.user_name;
    const senderEmail = this.contactForm.value.user_email;
    const messageBody = this.contactForm.value.message;
    const personalizedMessage = `Cher ${senderName},\n\nMerci pour votre message. Voici le contenu que vous avez envoyé :\n\n${messageBody}\n\nCordialement,\nSiliad`;
  
  
    emailjs.send('service_nu1k82a', 'template_hqbij03', {
      message:personalizedMessage,
      From:'Siliad@contact.ma',
      To:senderEmail,
      subject:'Objet : Re : Votre Feedback - ControleTechnique'
    }
    , 'PN9MwwaL0zw9s_F0V')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

      this.contactForm.reset();
     
  }

}
