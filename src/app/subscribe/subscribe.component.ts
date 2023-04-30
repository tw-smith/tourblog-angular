import { Component } from '@angular/core';
import { FormSubmitService } from '../form-submit.service';
import { ResponsiveService } from '../responsive.service';
import { Breakpoints } from '@angular/cdk/layout';
import { SubscribeFormEntry } from '../subscribe-entry';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent {
  constructor (
    private formSubmitService: FormSubmitService,
    private responsiveService: ResponsiveService,
  ) {}

  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';
  isHandsetPortrait: boolean = false;
  isHandsetLandscape: boolean = false;
  isWebLandscape: boolean = true;
  model = new SubscribeFormEntry('', '', '')
  submitted = false;
  msg: any = '';
  
  ngOnInit(): void {
    this.responsiveService.breakpointChanged().subscribe((state) => {
      this.isHandsetPortrait = state.breakpoints[Breakpoints.HandsetPortrait];
      this.isHandsetLandscape = state.breakpoints[Breakpoints.HandsetLandscape];
      this.isWebLandscape = state.breakpoints[Breakpoints.WebLandscape];
    })
  }

  onSubmit(form: NgForm) {
    this.msg = this.formSubmitService.submitSubscribeForm(form.value).subscribe({
        next() {
          return 'You have subscribed'
        },
        error(err) {
          console.log(err)
          return err.msg
        }
    })
  }
}
