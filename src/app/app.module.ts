import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BlogIndexComponent } from './blog-index/blog-index.component';
import { LightboxGalleryComponent } from './lightbox-gallery/lightbox-gallery.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WhereAmIComponent } from './where-am-i/where-am-i.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { FormsModule } from '@angular/forms';
import { ContentFooterComponent } from './content-footer/content-footer.component';

import { LayoutModule } from "@angular/cdk/layout";

import { SubscribeComponent } from './subscribe/subscribe.component'

import { NgxMatomoTrackerModule } from '@ngx-matomo/tracker';
import { NgxMatomoRouterModule } from '@ngx-matomo/router'


@NgModule({
  declarations: [
    AppComponent,
    BlogPostComponent,
    NavbarComponent,
    BlogIndexComponent,
    LightboxGalleryComponent,
    PageNotFoundComponent,
    WhereAmIComponent,
    ContactMeComponent,
    ContentFooterComponent,
    SubscribeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    NgxMatomoTrackerModule.forRoot({ trackerUrl: 'https://matomo.cycling-south.com', siteId: '1' }),
    NgxMatomoRouterModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
