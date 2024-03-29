import { Component, Input } from '@angular/core';
import { BlogIndexService } from '../blog-index.service';
import { PostIndexItem } from '../post';
import { Breakpoints } from '@angular/cdk/layout';
import { ResponsiveService } from '../responsive.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private blogIndexService: BlogIndexService, 
              private responsiveService: ResponsiveService) {}
  @Input() siteTitle!: string;

  posts: PostIndexItem[] = [];
  tags: string[] = [];
  mobileNavModal = false;
  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';
  isHandsetPortrait: boolean = false;
  isHandsetLandscape: boolean = false;
  isTablet: boolean = false;
  isWebLandscape: boolean = true;

  ngOnInit(): void {
    this.responsiveService.breakpointChanged().subscribe((state) => {
      this.isHandsetPortrait = state.breakpoints[Breakpoints.HandsetPortrait];
      this.isHandsetLandscape = state.breakpoints[Breakpoints.HandsetLandscape];
      this.isTablet = (state.breakpoints[Breakpoints.TabletPortrait] || state.breakpoints[Breakpoints.TabletLandscape]);
      this.isWebLandscape = state.breakpoints[Breakpoints.WebLandscape];
    })
    this.getPosts();
  }

  get categoryTags() {
    if (this.posts) {
      return [...new Set(this.posts.map(({tag}) => tag))];
    } else {
      return null
    }
  }

  getPosts(): void { //TODO at the moment we make two API calls for post-index, one for navbar tags 
                    // and one for post mosaic view. Surely we can share the data and only make one API call?
    this.blogIndexService.getPostIndex('all').subscribe(resp => {
      resp.sort(function(a,b) {
        return a.displayDate.localeCompare(b.displayDate)
      })
      this.posts = resp;
    })
  }

  getTags(): void {
    this.tags = [...new Set(this.posts.map(({tag}) => tag))];
  }

  showMobileNavModal(): void {
    this.mobileNavModal = true;
    let mobileNavModalIcon = document.getElementById("mobileNavModalIcon") as HTMLImageElement
  }

  hideMobileNavModal(): void {
    this.mobileNavModal = false;
    let mobileNavModalIcon = document.getElementById("mobileNavModalIcon") as HTMLImageElement
  }
}
