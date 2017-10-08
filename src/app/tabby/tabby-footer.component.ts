import {Component} from '@angular/core';
import {PlayerService} from '../shared/player.service';

@Component(
  {
    selector: 'app-tabby-footer',
    template: `
    <p>Note Index: {{noteIndex}}</p>
    <p>Notes Per Second: {{averageSpeed}}</p>
    `
  }
)
export class TabbyFooterComponent {

  private static sigFigs(n, sig) {
    const mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1);
    return Math.round(n * mult) / mult;
  }

  constructor(playerService: PlayerService) {
    playerService.music.noteIndex$.subscribe((noteIndex) => {
       this.noteIndex = noteIndex;

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
         this.averageSpeed = TabbyFooterComponent.sigFigs((total / this.durations.length) / 1000.0, 2)
       }

    });

  }

  private durations = [0,0,0];
  private durationIndex = 0;
  private lastNote: any = new Date();

  public noteIndex = -1;
  public averageSpeed = 0;
}
