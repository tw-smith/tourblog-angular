import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { distinctUntilChanged, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  constructor(private breakpointObserver: BreakpointObserver) {}


  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';


  // readonly breakpoint$ = this.breakpointObserver
  // .observe([Breakpoints.HandsetPortrait, Breakpoints.WebLandscape])
  // .pipe(
  //   tap(value => console.log("asdas")),
  //   distinctUntilChanged(),
  //   this.breakpointChanged()
  // )

  // breakpointChanged(value) {
  //   if(value.isMatched(Breakpoints.WebLandscape)) {
  //     this.currentBreakpoint = Breakpoints.WebLandscape;
  //   } else if (value.isMatched(Breakpoints.HandsetPortrait)) {
  //     this.currentBreakpoint = Breakpoints.HandsetPortrait
  //   }
  //   return this.currentBreakpoint
  //  }





  // Breakpoints = Breakpoints;
  // currentBreakpoint: string = '';
  // readonly breakpoint$ = this.breakpointObserver
  // .observe([Breakpoints.HandsetPortrait])
  // .subscribe((state: BreakpointState) => {
  //   if (this.breakpointObserver.isMatched(Breakpoints.HandsetPortrait)) {
  //     this.currentBreakpoint = Breakpoints.HandsetPortrait
  //   }
  // })


}
