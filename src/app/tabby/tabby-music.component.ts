import {Component, OnInit} from '@angular/core';
import {Song} from '../shared/song';
import {Line} from '../shared/line';
import {TabParser} from '../shared/tabparser';
import {PlayerService} from '../shared/player.service';

@Component(
  {
    selector: 'app-tabby-music',

    styles: [`

      div.tabDisplay {
        font-size: 13px;
        font-family: monospace;
        white-space: pre /* important !!! */
      }
      
      div.tabPlayerControls {
        margin-bottom: -13px;
        width: 100%;
        /*font-size: 11px;*/
        background-color: #e0e0e0;
        font-family: monospace;
      }

      a.playerButton img {
        background-repeat: no-repeat;
        width: 24px;
        height: 24px;
        cursor: pointer;
        text-decoration: none;
      }

      a.playerButton.play img {
        background: url('/assets/img/sprites.png') -4px -4px;
      }

      a.playerButton.pause img {
        background: url('/assets/img/sprites.png') -36px -4px;
      }

      a.playerButton.stop img {
        background: url('/assets/img/sprites.png') -4px 92px;
      }

      a.playerButton.settings img {
        background: url('/assets/img/sprites.png') -36px 60px;
      }

      a.playerButton.play.disabled img {
        background: url('/assets/img/sprites_gray.png') -4px -4px;
      }

      a.playerButton.pause.disabled img {
        background: url('/assets/img/sprites_gray.png') -36px -4px;
      }

      a.playerButton.stop.disabled img {
        background: url('/assets/img/sprites_gray.png') -4px 92px;
      }

      a.playerButton.minimize,
      a.playerButton.window,
      a.playerButton.maximize {
        float: right;
      }

      a.playerButton.minimize img {
        background: url('/assets/img/sprites.png') -100px 92px;
      }

      a.playerButton.window img {
        background: url('/assets/img/sprites.png') -68px 92px;
      }

      a.playerButton.maximize img {
        background: url('/assets/img/sprites.png') -100px -4px;
      }

      a img {
        border: none;
        vertical-align: top;
      }

      div.tabDisplay.minimize {
        display: none;
      }

      div.tabDisplay.window {
        height: 10pc;
        overflow-y: scroll;
      }

    `],

    template: `
      <div class="tabPlayerControls">
        <a class="playerButton play"  [ngClass]="{ 'disabled': playDisabled}" (click)="playerService.music.play()"><img></a>
        <a class="playerButton pause" [ngClass]="{ 'disabled': pauseDisabled}" (click)="playerService.music.pause()"><img></a>
        <a class="playerButton stop"  [ngClass]="{ 'disabled': stopDisabled}" (click)="playerService.music.stop()"><img></a>
        <a class="playerButton minimize" (click)="resizeToMinimize()"><img></a>
        <a class="playerButton window"   (click)="resizeToWindow()"><img></a>
        <a class="playerButton maximize" (click)="resizeToMaximize()"><img></a>
      </div>
      <p>{{title}}</p>
      <div class="tabDisplay" [ngClass]="{ 'window': window, 'minimize': minimize}" ><app-tabby-line *ngFor="let line of lines" [line]="line" ></app-tabby-line></div>
`
  }
)
export class TabbyMusicComponent implements OnInit {

  title = '';
  lines: Line[] = [];

  public playDisabled = false;
  public pauseDisabled = false;
  public stopDisabled = false;

  public window = false;
  public minimize = false;

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
}
