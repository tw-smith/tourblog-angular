import { Component, Input } from '@angular/core';
import { BlogIndexService } from '../blog-index.service';
import { PostIndexItem } from '../post';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private blogIndexService: BlogIndexService) {}
  @Input() siteTitle!: string;


  posts: PostIndexItem[] = [];
  tags: string[] = [];
  desktop = false;
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
      mobileNavModalIcon.src = 'assets/icons8-multiply-48.png'
   }

   hideMobileNavModal(): void {
    this.mobileNavModal = false;
    let mobileNavModalIcon = document.getElementById("mobileNavModalIcon") as HTMLImageElement
    mobileNavModalIcon.src = 'assets/icons8-hamburger-menu-48.png'
   }


   ngOnInit(): void {
    this.getPosts();
  }



}
