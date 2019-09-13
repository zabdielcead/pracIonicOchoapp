import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { PostComponent } from './post/post.component';



@NgModule({
  declarations: [
    PostComponent,
    PostsComponent
  ],
  exports: [
    PostComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
