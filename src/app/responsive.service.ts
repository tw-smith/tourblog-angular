import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { distinctUntilChanged, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  constructor(private breakpointObserver: BreakpointObserver) {}


  Breakpoints = Breakpoints;


  breakpointChanged(): Observable<BreakpointState> {
    return this.breakpointObserver
    .observe([Breakpoints.WebLandscape, 
              Breakpoints.HandsetPortrait,
              Breakpoints.HandsetLandscape,
              Breakpoints.TabletPortrait,
              Breakpoints.TabletLandscape])
    .pipe(
      tap(value => console.log(value)),
      distinctUntilChanged()
    )
  }
}
