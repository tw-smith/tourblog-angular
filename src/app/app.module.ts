import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BlogIndexComponent } from './blog-index/blog-index.component';
import { LightboxGalleryComponent } from './lightbox-gallery/lightbox-gallery.component';

import { SwiperModule } from 'swiper/angular';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WhereAmIComponent } from './where-am-i/where-am-i.component';
import { ContactMeComponent } from './contact-me/contact-me.component'

@NgModule({
  declarations: [
    AppComponent,
    BlogPostComponent,
    NavbarComponent,
    BlogIndexComponent,
    LightboxGalleryComponent,
    PageNotFoundComponent,
    WhereAmIComponent,
    ContactMeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SwiperModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
