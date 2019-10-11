import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { PostComponent } from './post/post.component';
import { PipesModule } from '../pipes/pipes.module';
import { MapaComponent } from './mapa/mapa.component';

import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';



@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    MapaComponent,
    AvatarSelectorComponent
  ],
  exports: [
    PostComponent,
    PostsComponent,
    MapaComponent,
    AvatarSelectorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
