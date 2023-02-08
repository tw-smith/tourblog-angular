import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogIndexComponent } from './blog-index/blog-index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WhereAmIComponent } from './where-am-i/where-am-i.component';
import { ContactMeComponent } from './contact-me/contact-me.component';

const routes: Routes = [
  { path: 'post/:slug', component: BlogPostComponent },
  { path: 'posts', redirectTo: 'posts/all'},
  { path: 'posts/:tag', component: BlogIndexComponent},
  { path: 'contact', component: ContactMeComponent},
  { path: 'where-am-i', component: WhereAmIComponent},
  { path: '404', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
