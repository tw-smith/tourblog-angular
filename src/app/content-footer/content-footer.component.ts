import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-content-footer',
  templateUrl: './content-footer.component.html',
  styleUrls: ['./content-footer.component.css']
})
export class ContentFooterComponent {
  constructor(private router: Router) {}

  currentURL: string = ''


  ngOnInit() {

    this.router.events.subscribe((event: Event) => {    
      if (event instanceof NavigationEnd) {
        console.log(event.url)
        this.currentURL = event.url
      }
  })


}}
