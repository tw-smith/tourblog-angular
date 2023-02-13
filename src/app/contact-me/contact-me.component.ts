import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactFormEntry } from '../contact-entry';
import { FormSubmitService } from '../form-submit.service';
import { ResponsiveService } from '../responsive.service';
import { Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent {
  constructor (
    private formSubmitService: FormSubmitService,
    private responsiveService: ResponsiveService,
  ) {}


  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';
  isHandsetPortrait: boolean = false;
  isHandsetLandscape: boolean = false;
  isWebLandscape: boolean = true;

  model = new ContactFormEntry('', '', '')
  submitted = false;


    ngOnInit(): void {
      this.responsiveService.breakpointChanged().subscribe((state) => {
        this.isHandsetPortrait = state.breakpoints[Breakpoints.HandsetPortrait];
        this.isHandsetLandscape = state.breakpoints[Breakpoints.HandsetLandscape];
        this.isWebLandscape = state.breakpoints[Breakpoints.WebLandscape];
      })
    }


  onSubmit(form: NgForm): void {
    this.formSubmitService.submitForm(form.value).subscribe(resp => {
      console.log(resp)
    })
    this.submitted = true
  }
}

