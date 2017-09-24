import {Song} from './song';

describe('Song', () => {
  it('should create an instance', () => {
    expect(new Song('', 0, '')).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const song = new Song(
      'hello',
      123,
      'world'
    );
    expect(song.title).toEqual('hello');
    expect(song.bartime).toEqual( 123 );
    expect(song.tabulature).toEqual('world');
  });
});
