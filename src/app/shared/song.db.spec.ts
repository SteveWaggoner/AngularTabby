import {TestBed, async, inject} from '@angular/core/testing';
import {Song} from './song';
import {SongDb} from './song.db';

describe('SongService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SongDb]
    });
  });

  it('should ...', inject([SongDb], (service: SongDb) => {
    expect(service).toBeTruthy();
  }));

});
