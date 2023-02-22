import { Component } from '@angular/core';
import { BlogIndexService } from '../blog-index.service';
import { Post, PostIndexItem } from '../post';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged } from 'rxjs';
import { ResponsiveService } from '../responsive.service';
import { environment } from 'src/environments/environment';
//import { PostListItem } from '../postlist';



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
    isWebLandscape: boolean = true;
    apiUrl: string = '';


     ngOnInit(): void {
      this.apiUrl = environment.apiUrl;
      this.responsiveService.breakpointChanged().subscribe((state) => {
        this.isHandsetPortrait = state.breakpoints[Breakpoints.HandsetPortrait];
        this.isHandsetLandscape = state.breakpoints[Breakpoints.HandsetLandscape];
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
  
  





  posts: PostIndexItem[] = [];


   getPosts(): void {
    let tag = String(this.route.snapshot.paramMap.get('tag'));
    console.log(`tag is ${tag}`)
    this.blogIndexService.getPostIndex(tag).subscribe(resp => {

      resp.sort(function(a,b) {
        return a.displayDate.localeCompare(b.displayDate)
      })
      
      this.posts = resp;
     })
   }

   formatDate(value:string, locale='en-GB') {
    return new Date(value).toLocaleDateString(locale, {day: 'numeric', month: 'long', year: 'numeric'});
   }





    
  }

