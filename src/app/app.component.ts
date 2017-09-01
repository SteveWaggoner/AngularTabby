import {Component} from '@angular/core';
import {SongService} from './shared/song.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SongService]
})
export class AppComponent {

  constructor(private songService: SongService) {
  }

  get songs() {
    return this.songService.getAllSongs();
  }

}

