import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitazer'
})
export class DomSanitazerPipe implements PipeTransform {


  constructor( private domSanitazer: DomSanitizer ) {

  }

  transform(img: string ): any {
    const domImg = `background-image:url('${img}')`;

    return this.domSanitazer.bypassSecurityTrustStyle(domImg);
  }

}
