import {Component} from '@angular/core';
import {PlayerService} from '../shared/player.service';

@Component(
  {
    selector: 'app-tabby-footer',
    template: `
    <p>Note Index: {{noteIndex}}</p>
    <p>Note Speed: {{averageSpeed}}</p>
    `
  }
)
export class TabbyFooterComponent {

  private durations = [0, 0, 0];
  private durationIndex = 0;
  private lastNote: any = new Date();

  public noteIndex = -1;
  public averageSpeed = 0;

  private static sigFigs(n, sig) {
    const mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1);
    return Math.round(n * mult) / mult;
  }

  constructor(playerService: PlayerService) {
    playerService.music.note$.subscribe((note) => {

      if ( note ) {
        this.noteIndex = note.index;
      } else {
        this.noteIndex = -1;
      }

       // update average speed
       const currentTime: any = new Date();
       const elapsedMilliSecs = currentTime - this.lastNote;
       if ( elapsedMilliSecs > 5 ) {
         this.lastNote = currentTime;
         this.durations[this.durationIndex] = elapsedMilliSecs;
         this.durationIndex++;
         this.durationIndex = this.durationIndex % this.durations.length;
         let total = 0;
         this.durations.forEach((d) => {
           total += d;
         });
         this.averageSpeed = TabbyFooterComponent.sigFigs(total / this.durations.length , 2);
       }

    });

  }


}
