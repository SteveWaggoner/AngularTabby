import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <section class="tabbyapp">
      <app-tabby-header></app-tabby-header>
      <app-tabby-music></app-tabby-music>
      <app-tabby-footer></app-tabby-footer>
    </section>
  `
})
export class AppComponent {

}

