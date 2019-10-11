import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitazerPipe } from './dom-sanitazer.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { ImagenPipe } from './imagen.pipe';




@NgModule({
  declarations: [DomSanitazerPipe, ImageSanitizerPipe, ImagenPipe],
  imports: [
    CommonModule
  ],
  exports: [
    DomSanitazerPipe,
    ImageSanitizerPipe,
    ImagenPipe
  ]
})
export class PipesModule { }
