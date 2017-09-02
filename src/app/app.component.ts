import {Component} from '@angular/core';
import {SongService} from './shared/song.service';
import {Song} from './shared/song';


@Component({
  selector: 'app-root',
  template: `
    <section class="tabbyapp">
      <app-tabby-header></app-tabby-header>
      <app-tabby-body></app-tabby-body>
      <app-tabby-footer (onClick)="blahblah()"></app-tabby-footer>
    </section>
  `,
  providers: [SongService]
})
export class AppComponent {


  constructor(private songService: SongService) {
    songService.selectedSong.subscribe((song: Song) => {
      console.log('select song is ' + song.title);
    });
  }


  public blahblah() {


    this.songService.addSong({'id': 333, 'title': 'foo', 'bartime': 333, 'tabulature': 'bar'});

    const fur = this.songService.firstSong()
    this.songService.setSelectedSong(fur);

    console.log(fur);
  }

}

