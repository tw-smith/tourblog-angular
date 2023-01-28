import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Photo } from '../post';
import { SwiperComponent } from 'swiper/angular';
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

  config: SwiperOptions = {
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

  initSwiper() {
    this.swiperOn = true;
    document.getElementsByTagName("body")[0].classList.add("disabled-scroll")
    
  }

  closeSwiper() {
    this.swiperOn = false;
    document.getElementsByTagName("body")[0].classList.remove("disabled-scroll")
  }
}
