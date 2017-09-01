import {Song} from './song';

describe('Song', () => {
  it('should create an instance', () => {
    expect(new Song()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const song = new Song({
      id: 99,
      title: 'hello',
      bartime: 123,
      tabulature: 'world'
    });
    expect(song.id).toEqual(99);
    expect(song.title).toEqual('hello');
    expect(song.bartime).toEqual( 123 );
    expect(song.tabulature).toEqual('world');
  });
});
