import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactFormEntry } from '../contact-entry';
import { FormSubmitService } from '../form-submit.service';



@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent {
  constructor (
    private formSubmitService: FormSubmitService
  ) {}



  model = new ContactFormEntry('', '', '')
  submitted = false;

  onSubmit(form: NgForm): void {
    this.formSubmitService.submitForm(form.value).subscribe(resp => {
      console.log(resp)
    })
    this.submitted = true
  }
}

