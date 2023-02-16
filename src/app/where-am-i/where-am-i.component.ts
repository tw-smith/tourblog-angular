import { Component } from '@angular/core';
import { ResponsiveService } from '../responsive.service';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-where-am-i',
  templateUrl: './where-am-i.component.html',
  styleUrls: ['./where-am-i.component.css']
})
export class WhereAmIComponent {
  constructor(private responsiveService: ResponsiveService) {}

  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';
  isHandsetPortrait: boolean = false;
  isHandsetLandscape: boolean = false;
  isWebLandscape: boolean = true;

  ngOnInit(): void {
    this.responsiveService.breakpointChanged().subscribe((state) => {
      this.isHandsetPortrait = state.breakpoints[Breakpoints.HandsetPortrait];
      this.isHandsetLandscape = state.breakpoints[Breakpoints.HandsetLandscape];
      this.isWebLandscape = state.breakpoints[Breakpoints.WebLandscape];
    })
  }

}
