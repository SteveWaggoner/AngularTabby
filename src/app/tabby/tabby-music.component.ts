import {Component, OnInit} from '@angular/core';
import {Song} from '../shared/song';
import {TabParser, TabLine} from '../shared/tabparser';
import {PlayerService} from '../shared/player.service';

@Component(
  {
    selector: 'app-tabby-music',

    styles: [`

      div.tabDisplay {
        font-size: 13px;
        font-family: monospace;
        white-space: pre; /* important !!! */
        background: url('assets/img/paper.png');
      }

      div.tabPlayerControls {
      }

      a.playerButton img {
        background-repeat: no-repeat;
        width: 54px;
        height: 54px;
        cursor: pointer;
        text-decoration: none;
        display: inline-block; /* for firefox since img has no src */
      }

      a.playerButton.play img {
        background: url('assets/img/icons.png') 0px 0px;
      }

      a.playerButton.pause img {
        background: url('assets/img/icons.png') -64px 0px;
      }

      a.playerButton.stop img {
        background: url('assets/img/icons.png') -128px 0px;
      }


      a.playerButton.play.disabled img {
        background: url('assets/img/icons_gray.png') -0px 0px;
      }

      a.playerButton.pause.disabled img {
        background: url('assets/img/icons_gray.png') -64px 0px;
      }

      a.playerButton.stop.disabled img {
        background: url('assets/img/icons_gray.png') -128px 0px;
      }

      a img {
        vertical-align: top;
        margin-top: 15px;
      }

    `],

    template: `
    <div class="tabPlayerControls">
      <a class="playerButton play"  [ngClass]="{ 'disabled': playDisabled}" (click)="playerService.music.play()"><img></a>
      <a class="playerButton pause" [ngClass]="{ 'disabled': pauseDisabled}" (click)="playerService.music.pause()"><img></a>
      <a class="playerButton stop"  [ngClass]="{ 'disabled': stopDisabled}" (click)="playerService.music.stop()"><img></a>
    </div>
    <p>{{title}}</p>
    <div class="tabDisplay" [ngClass]="{ 'window': window, 'minimize': minimize}" ><app-tabby-line *ngFor="let line of lines" [line]="line" ></app-tabby-line></div>
`
  }
)
export class TabbyMusicComponent implements OnInit {

  title = '';
  lines: TabLine[] = [];

  public playDisabled = false;
  public pauseDisabled = false;
  public stopDisabled = false;
/*
  public window = false;
  public minimize = false;
*/
  constructor(public playerService: PlayerService) {
    this.playerService.music.song$.subscribe((song) => { this.loadSong( song ); });

    this.playerService.music.isPlaying$.subscribe((isPlaying) => {
        this.playDisabled =   isPlaying;
        this.pauseDisabled = !isPlaying;
        this.stopDisabled =  !isPlaying;
    });


    this.playerService.music.isPaused$.subscribe((isPaused) => {
    //    this.pauseDisabled = ! isPaused;
    });

  }

  loadSong(song: Song) {

    if (song) {
      this.lines = TabParser.parseTabulature(song.tabulature);
      this.title = song.title;
    }
  }

  ngOnInit() {
  }
/*
  resizeToMinimize() {
    this.minimize = true;
    this.window = false;
  }

  resizeToWindow() {
    this.minimize = false;
    this.window = true;
  }

  resizeToMaximize() {
    this.minimize = false;
    this.window = false;
  }
 */
}
