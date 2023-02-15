import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Photo } from '../post';
// import { SwiperComponent } from 'swiper/angular';

import { register } from 'swiper/element/bundle'

import { ResponsiveService } from '../responsive.service';
import { Breakpoints } from '@angular/cdk/layout';

import SwiperCore, { SwiperOptions, Navigation, Swiper, EffectFade } from 'swiper';

Swiper.use([Navigation, EffectFade])


import { NgFor } from '@angular/common';

@Component({
  selector: 'app-lightbox-gallery',
  templateUrl: './lightbox-gallery.component.html',
  styleUrls: ['./lightbox-gallery.component.css'],
  encapsulation: ViewEncapsulation.None //TODO why do we need this to make slider work?
})
export class LightboxGalleryComponent {
  constructor(private responsiveService: ResponsiveService) {}

  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';
  isHandsetPortrait: boolean = false;
  isHandsetLandscape: boolean = false;
  isWebLandscape: boolean = true;


  @Input() photos!: Photo[]

  modalSwiperOn: boolean = false;
  previewSwiperOn: boolean = true;
  previewSwiperEl: any;
  modalSwiperEl: any;


  ngOnInit(): void {
      this.previewSwiperEl = document.getElementById("swiper1");
      this.modalSwiperEl = document.getElementById("swiper2");

      this.responsiveService.breakpointChanged().subscribe((state) => {
      this.isHandsetPortrait = state.breakpoints[Breakpoints.HandsetPortrait];
      this.isHandsetLandscape = state.breakpoints[Breakpoints.HandsetLandscape];
      this.isWebLandscape = state.breakpoints[Breakpoints.WebLandscape];
    })


    register()

    this.initPreviewSwiper()
    this.initModalSwiper()
  }


  initPreviewSwiper() {
    const params = {
      injectStyle: [`
        .swiper-pagination-bullet {
          background: rgb(0,0,0);
          opacity: 0.8;
        }
      
        .swiper-pagination-bullet-active {
          background: cyan;
        }`
      ],
      navigation: true,
      pagination: true,
      slidesPerView: 1,
      loop: false,
      init: false,
    }

    Object.assign(this.previewSwiperEl, params);
    this.previewSwiperEl.initialize();
  }

  initModalSwiper() {
    const params = {
      initialSlide: 0,
      enabled: false,
      navigation: true,
      pagination: true,
      slidesPerView: 1,
      loop: false,
      init: false,
    };
    Object.assign(this.modalSwiperEl, params);
    this.modalSwiperEl.initialize();
  }


  goToModalView(index: number) {
    this.previewSwiperEl.enabled = false;
    this.modalSwiperEl.enabled = true;
    this.modalSwiperEl.swiper.slideTo(index);
    this.modalSwiperOn = true;
    document.getElementsByTagName("body")[0].classList.add("disabled-scroll")

  }

  goToPreviewView(index: number) {
    this.modalSwiperEl.enabled = false;
    this.previewSwiperEl.enabled = true;
    this.previewSwiperEl.swiper.slideTo(index)
    this.modalSwiperOn = false;
    document.getElementsByTagName("body")[0].classList.remove("disabled-scroll") 
  }

}
