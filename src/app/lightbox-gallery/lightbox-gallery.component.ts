import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Photo } from '../post';
// import { SwiperComponent } from 'swiper/angular';

import { register } from 'swiper/element/bundle'

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
  @Input() photos!: Photo[]

  swiperOn: boolean = false;
  ngOnInit(): void {
    register()

    const swiperEl = document.querySelector('swiper-container') as any;
    const params = {
      injectStyles: [`
      
      .swiper-paginiation-bullet {
        background: rgb(0,0,0);
        opacity: 0.8;
      }

      .swiper-pagination-bullet-active {
        background: cyan;
      }
      
      `

      ],
    }
    Object.assign(swiperEl, params);
    swiperEl.initialize();


  }

  config: SwiperOptions = {
    initialSlide: 1,
    navigation: true,
    keyboard: true, //TODO keyboard nav with arrrow buttons doesnt work
    loop: true,
    speed: 750,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    watchSlidesProgress: true
  }

  initSwiper(i: number) {
    this.config.initialSlide = i;
    this.swiperOn = true;
    document.getElementsByTagName("body")[0].classList.add("disabled-scroll")
    
  }

  closeSwiper() {
    this.swiperOn = false;
    document.getElementsByTagName("body")[0].classList.remove("disabled-scroll")
  }
}
