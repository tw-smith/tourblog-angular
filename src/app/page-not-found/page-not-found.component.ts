import { Component } from '@angular/core';
import { SplashImageService } from '../splash-image.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  constructor(private splashImageService: SplashImageService) {}

  splashURL: string = ''

  getSplashURL(): void {
    this.splashImageService.getSplashURL().subscribe(resp => {
      this.splashURL = resp.splashURL
    })
  }

  ngOnInit(): void {
    this.getSplashURL()
  }

}
