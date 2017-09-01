import {TestBed, async, inject} from '@angular/core/testing';
import {Song} from './song';
import {SongService} from './song.service';

describe('SongService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SongService]
    });
  });

  it('should ...', inject([SongService], (service: SongService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllTodos()', () => {

    it('should return an empty array by default', inject([SongService], (service: SongService) => {
      expect(service.getAllSongs()).toEqual([]);
    }));



  });


});
