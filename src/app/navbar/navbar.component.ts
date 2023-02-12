import { Component, Input } from '@angular/core';
import { BlogIndexService } from '../blog-index.service';
import { PostIndexItem } from '../post';
 import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { distinctUntilChanged } from 'rxjs';
import { ResponsiveService } from '../responsive.service';
import { tap } from 'rxjs';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private blogIndexService: BlogIndexService, private breakpointObserver: BreakpointObserver) {}
  @Input() siteTitle!: string;


  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';

  readonly breakpoint$ = this.breakpointObserver
  .observe([Breakpoints.HandsetPortrait, Breakpoints.WebLandscape])
  .pipe(
    tap(value => console.log(value)),
    distinctUntilChanged()
  )

  private breakpointChanged() {
    if(this.breakpointObserver.isMatched(Breakpoints.WebLandscape)) {
      this.currentBreakpoint = Breakpoints.WebLandscape;
    } else if (this.breakpointObserver.isMatched(Breakpoints.HandsetPortrait)) {
      this.currentBreakpoint = Breakpoints.HandsetPortrait
    }
   }

   ngOnInit(): void {
    this.breakpoint$.subscribe(() => this.breakpointChanged())
    this.getPosts();
  }

  // .pipe(
  //   tap(value => console.log("asdas")),
  //   distinctUntilChanged()
  // )



  posts: PostIndexItem[] = [];
  tags: string[] = [];
  mobileNavModal = false;

   getPosts(): void { //TODO at the moment we make two API calls for post-index, one for navbar tags 
                      // and one for post mosaic view. Surely we can share the data and only make one API call?
    this.blogIndexService.getPostIndex('all').subscribe(resp => {
      this.posts = resp;
      this.getTags()
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
