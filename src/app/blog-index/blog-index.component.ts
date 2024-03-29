import { Component } from '@angular/core';
import { BlogIndexService } from '../blog-index.service';
import { Post, PostIndexItem } from '../post';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Breakpoints } from '@angular/cdk/layout';
import { ResponsiveService } from '../responsive.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-index',
  templateUrl: './blog-index.component.html',
  styleUrls: ['./blog-index.component.css']
})

export class BlogIndexComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogIndexService: BlogIndexService,
    private responsiveService: ResponsiveService) {}

  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';
  isHandsetPortrait: boolean = false;
  isHandsetLandscape: boolean = false;
  isTabletPortrait: boolean = false;
  isWebLandscape: boolean = true;
  apiUrl: string = '';
  posts: PostIndexItem[] = [];


  ngOnInit(): void {
    this.apiUrl = environment.apiUrl;
    this.responsiveService.breakpointChanged().subscribe((state) => {
    this.isHandsetPortrait = state.breakpoints[Breakpoints.HandsetPortrait];
    this.isHandsetLandscape = state.breakpoints[Breakpoints.HandsetLandscape];
    this.isTabletPortrait = state.breakpoints[Breakpoints.TabletPortrait]
    this.isWebLandscape = state.breakpoints[Breakpoints.WebLandscape]
    })
    this.getPosts();
    this.route.params.subscribe((params) => {
      if (params['tag'] == null) {
        console.log('null tag')
        return
      }
      this.router.navigate([`/posts/${params['tag']}`])
      .then(nav => {
        this.getPosts()
        console.log(nav);
      }, err => {
        console.log(err)
        })
    })  
  }

  getPosts(): void {
    let tag = String(this.route.snapshot.paramMap.get('tag'));
    this.blogIndexService.getPostIndex(tag).subscribe(resp => {
      resp.sort(function(a,b) {
        return b.displayDate.localeCompare(a.displayDate)
      })
      this.posts = resp;
    })
  }

  formatDate(value:string, locale='en-GB') {
    return new Date(value).toLocaleDateString(locale, {day: 'numeric', month: 'long', year: 'numeric'});
  }
  }

