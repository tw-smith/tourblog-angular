import { Component } from '@angular/core';
import { SplashImageService } from '../splash-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  constructor(private splashImageService: SplashImageService) {}

  splashURL: string = ''
  apiUrl: string = ''

  ngOnInit(): void {
    this.apiUrl = environment.apiUrl;
    this.getSplashURL()
  }

  getSplashURL(): void {
    this.splashImageService.getSplashURL().subscribe(resp => {
      this.splashURL = resp.splashURL
    })
  }
}
