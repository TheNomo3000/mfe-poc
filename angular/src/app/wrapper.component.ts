import {
  AfterContentInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { registry } from './registry';
import { CommonModule } from '@angular/common';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  template: '<div #vc></div>',
  standalone: true,
  imports: [CommonModule],
})
export class WrapperComponent implements AfterContentInit {
  @ViewChild('vc', { read: ElementRef, static: true })
  vc!: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngAfterContentInit(): void {
    const elementName = this.route.snapshot.data['elementName'];
    const importName = this.route.snapshot.data['importName'];

    const importFn = registry[importName];
    importFn()
      .then((_: any) => console.debug(`element ${elementName} loaded!`))
      .catch((err: any) => console.error(`error loading ${elementName}:`, err));

    const element = document.createElement(elementName);
    this.vc.nativeElement.appendChild(element);
  }
}
