import { Component, Input, ViewEncapsulation } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { Photo } from '../post';
import { environment } from 'src/environments/environment';
// import { SwiperComponent } from 'swiper/angular';

import { register } from 'swiper/element/bundle'

import { ResponsiveService } from '../responsive.service';
import { PinchZoomService } from '../pinch-zoom.service';
import { Breakpoints } from '@angular/cdk/layout';

import SwiperCore, { SwiperOptions, Navigation, Swiper, EffectFade } from 'swiper';

Swiper.use([Navigation, EffectFade])


import { NgFor } from '@angular/common';
import { expand } from 'rxjs';

@Component({
  selector: 'app-lightbox-gallery',
  templateUrl: './lightbox-gallery.component.html',
  styleUrls: ['./lightbox-gallery.component.css'],
  encapsulation: ViewEncapsulation.None //TODO why do we need this to make slider work?
})
export class LightboxGalleryComponent {
  constructor(private responsiveService: ResponsiveService,
              private location: LocationStrategy,
              private pinchZoom: PinchZoomService) {}

  apiUrl: string = '';

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
      this.apiUrl = environment.apiUrl;
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
    // this.addPhotoEventListeners()
  }

  // addPhotoEventListeners() {
  //   // add expand icon event listener
  //   const galleryElements = document.querySelectorAll('.gallery__item-wrapper');
  //   console.log(galleryElements)
  //   galleryElements.forEach(element => {
  //     element.addEventListener("touchstart", function() {
  //       console.log("image touch")
  //     })
  //   })
  // }

  initPreviewSwiper() {
    console.log("in preview swiper init")
    const params = {
      slidesPerView: 1,
      loop: false,
      init: false,
      virtual: true,
      spaceBetween: 1000,
    }

    if (this.isHandsetPortrait || this.isHandsetLandscape) {
      const mobileParams = {
        pagination: {
          dynamicBullets: true,
        },
      }
      Object.assign(params, mobileParams)

    } else {
      const desktopParams = {
        pagination: true,
        navigation: true,
      }
      Object.assign(params, desktopParams)
    }
    Object.assign(this.previewSwiperEl, params);
    this.previewSwiperEl.initialize();
    // const swiperSlides = document.querySelectorAll('swiper-slide');
    // console.log(swiperSlides)
    // this.previewSwiperEl.addEventListener('tap', (event: Event) => {

    //   const swiperElement = event.currentTarget as HTMLElement;
    //   const expandIconElement = swiperElement.querySelector('#expandIcon')
    //   // const expandIconElement = swiperElement.lastElementChild;
    //   console.log(expandIconElement)
    //   expandIconElement?.classList.toggle('expandIcon--visible')
    //   console.log("slide tap")})




  }

  initModalSwiper() {
    const params = {
      initialSlide: 0,
      enabled: false,
      navigation: false,
      pagination: true,
      slidesPerView: 1,
      loop: false,
      init: false,
    };
    Object.assign(this.modalSwiperEl, params);
    this.modalSwiperEl.initialize();
  }


  goToModalView() {
    this.previewSwiperEl.enabled = false;
    this.modalSwiperEl.enabled = true;
    this.modalSwiperEl.swiper.slideTo(this.previewSwiperEl.swiper.activeIndex);
    this.modalSwiperOn = true;
    const targetElement = document.getElementById("gallery__item") as HTMLImageElement
    if (!targetElement) {
      throw new Error("The element #gallery__item wasn't found")
    }
    if (targetElement.nodeName !== 'IMG') {
      throw new Error("The element type for #gallery__item is not img")
    }
    this.pinchZoom.initPinchZoom(targetElement)
    // Override browser navigation when modal window is open to close modal
    // window rather than navigating to a new page.
    history.pushState(null, '', window.location.href)
    this.location.onPopState(() => {                    
      history.pushState(null, '', window.location.href);
      this.goToPreviewView()
    })
    document.getElementsByTagName("body")[0].classList.add("disabled-scroll")

  }

  goToPreviewView() {
    this.modalSwiperEl.enabled = false;
    this.previewSwiperEl.enabled = true;
    this.previewSwiperEl.swiper.slideTo(this.modalSwiperEl.swiper.activeIndex)
    this.modalSwiperOn = false;
    document.getElementsByTagName("body")[0].classList.remove("disabled-scroll") 
  }

}
