import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {List} from 'immutable';

import {Song} from './song';

export class SongDb {

  constructor() {
    this.loadInitialData();
  }

  private _songs: BehaviorSubject<List<Song>> = new BehaviorSubject(List([]));
  public readonly songs$: Observable<List<Song>> = this._songs.asObservable();

  public addSong(song: Song) {
    this._songs.next(this._songs.getValue().push(song));
  }

  public firstSong(): Song {
    return this._songs.getValue().first();
  }


  private loadInitialData() {

    const fur_elise = new Song(
      'Für Elise', 3000,
      `
E||------0---|--0---0-------|--------------|--------------|----------0---|
B||--------4-|----4---0-3-1-|--------------|--0---------0-|--1---------4-|
G||----------|--------------|--2---2-----2-|------1---1---|------2-------|
D||----------|--------------|----2-----2---|----2---2-----|----2---2-----|
A||----------|--------------|--0-----3-----|--------------|--0-----------|
E||----------|--------------|--------------|--0-----------|--------------|
                                                                          
--0---0-------|--------------|--------------|---------0---|--0---0-------|
----4---0-3-1-|--------------|--0-------1-0-|-----------4-|----4---0-3-1-|
--------------|--2---2-----2-|------1-------|--2---2------|--------------|
--------------|----2-----2---|----2---2-----|----2--------|--------------|
--------------|--0-----3-----|--------------|--0----------|--------------|
--------------|--------------|--0-----------|-------------|--------------|
                                                                           
--------------|--------------|----------0---|--0---0-------|--------------|
--------------|--0---------0-|--1---------4-|----4---0-3-1-|--------------|
--2---2-----2-|------1---1---|------2-------|--------------|--2---2-----2-|
----2-----2---|----2---2-----|----2---2-----|--------------|----2-----2---|
--0-----3-----|--------------|--0-----------|--------------|--0-----3-----|
--------------|--0-----------|--------------|--------------|--------------|
                                                                           
--------------|--------------|--0-------1-0-|----------0---|--------------|
--0-------1-0-|--------0-1-3-|------1-------|--3---0-----3-|--1-------3-1-|
------1-------|--2---2-------|--------0-----|----0---------|------2-------|
----2---0-----|----2---------|----2---------|--------3-----|----2---2-----|
--------------|--0-----------|--3-----------|--------------|--0-----------|
--0-----------|--------------|--------------|--3-----------|--------------|
                                                                            
------0---0---|--0---12---0---|--0---0---0---|--0---0-------|--------------|
--0-----------|---------4---4-|----4---4---4-|----4---0-3-1-|--------------|
--------------|----9----------|--------------|--------------|--2---2-----2-|
----2---2---2-|---------------|--------------|--------------|----2-----2---|
--------------|---------------|--------------|--------------|--0-----3-----|
--0-----------|---------------|--------------|--------------|--------------|
                                                                           
--------------|----------0---|--0---0-------|--------------|--------------|
--0---------0-|--1---------4-|----4---0-3-1-|--------------|--0-------1-0-|
------1---1---|------2-------|--------------|--2---2-----2-|------1-------|
----2---2-----|----2---2-----|--------------|----2-----2---|----2---0-----|
--------------|--0-----------|--------------|--0-----3-----|--------------|
--0-----------|--------------|--------------|--------------|--0-----------|
                                                                           
--------------|--0-------1-0-|----------0---|--------------|------0---0---|
--------0-1-3-|------1-------|--3---0-----3-|--1-------3-1-|--0-----------|
--2---2-------|--------0-----|----0---------|------2-------|--------------|
----2---------|----2---------|--------3-----|----2---2-----|----2---2---2-|
--0-----------|--3-----------|--------------|--0-----------|--------------|
--------------|--------------|--3-----------|--------------|--0-----------|
                                                                            
--0---12---0---|--0---0---0---|--0---0-------|--------------|--------------|
---------4---4-|----4---4---4-|----4---0-3-1-|--------------|--0---------0-|
---------------|--------------|--------------|--2---2-----2-|------1---1---|
---------------|--------------|--------------|----2-----2---|----2---2-----|
---------------|--------------|--------------|--0-----3-----|--------------|
----0----------|--------------|--------------|--------------|--0-----------|
                                                                           
----------0---|--0---0-------|--------------|--------------|--------------|
--1---------4-|----4---0-3-1-|--------------|--0-------1-0-|--------1-1-1-|
------2-------|--------------|--2---2-----2-|------1-------|--2---2-----3-|
----2---2-----|--------------|----2-----2---|----2---0-----|----2---2-3-2-|
--0-----------|--------------|--0-----3-----|--------------|--0-----1-0---|
--------------|--------------|--------------|--0-----------|------------3-|
                                                                    
----------1---0-|----------6---5-|--5/3-1-0-----|------------------|
--1-------1-----|--5---3---3-----|----------3-1-|------------------|
--2-2---2---2---|----3---3---3---|--------------|--3---2---2-0-2-3-|
------3---------|--3-------------|--3/2-0-2-3-2-|--3---------------|
----------------|----------------|--------------|----3-3h0---------|
--1-------------|----------------|--------------|------------------|
                                                                          
--------------|--0-----0-1---|----------------|----3---3---3---3---3---3-|
--1-------3-4-|------1-------|--1-------3---0-|--1-----------0---1---3---|
--2-2---2-----|----2---2---2-|----------------|------0---2---------------|
--3---3-------|--2-------0-3-|----2---3---3---|--------------3---2---0---|
--------------|--------------|----------------|--3-----------------------|
--------------|--------------|--3---3---3-----|--------------------------|
                                                      
--0-3-8h7-5h3-1-0---3-1---|----3---3---3---3---3---3-|
------------------3-----3-|--1-----------0---1---3---|
------------------0-------|------0---2---------------|
----------3---------------|--------------3---2---0---|
--3/--7-------------------|--3-----------------------|
--------------------------|--------------------------|
                                                                                
--0-3-8h7-5h3-1-0---3-1---|--0-1-0---0---0---0---0---|--0-----0---|--0-----0---|
------------------3-----3-|--------4---0---4---0---4-|------0---4-|------0---4-|
------------------0-------|--1-----------------------|------------|------------|
----------3---------------|--------------------------|------------|------------|
--3/--7-------------------|--------------------------|------------|------------|
--------------------------|--------------------------|------------|------------|
                                                                           
--0---0---0---|--0---0-------|--------------|--------------|----------0---|
----4---4---4-|----4---0-3-1-|--------------|--0---------0-|--1---------4-|
--------------|--------------|--2---2-----2-|------1---1---|------2-------|
--------------|--------------|----2-----2---|----2---2-----|----2---2-----|
--------------|--------------|--0-----3-----|--------------|--0-----------|
--------------|--------------|--------------|--0-----------|--------------|
                                                                           
--0---0-------|--------------|--------------|--------------|--0-------1-0-|
----4---0-3-1-|--------------|--0-------1-0-|--------0-1-3-|------1-------|
--------------|--2---2-----2-|------1-------|--2---2-------|--------0-----|
--------------|----2-----2---|----2---0-----|----2---------|----2---------|
--------------|--0-----3-----|--------------|--0-----------|--3-----------|
--------------|--------------|--0-----------|--------------|--------------|
                                                                            
----------0---|--------------|------0---0---|--0---12---0---|--0---0---0---|
--3---0-----3-|--1-------3-1-|--0-----------|---------4---4-|----4---4---4-|
----0---------|------2-------|--------------|---------------|--------------|
--------3-----|----2---2-----|----2---2---2-|---------------|--------------|
--------------|--0-----------|--------------|---------------|--------------|
--3-----------|--------------|--0-----------|----0----------|--------------|
                                                                           
--0---0-------|--------------|--------------|----------0---|--0---0-------|
----4---0-3-1-|--------------|--0---------0-|--1---------4-|----4---0-3-1-|
--------------|--2---2-----2-|------1---1---|------2-------|--------------|
--------------|----2-----2---|----2---2-----|----2---2-----|--------------|
--------------|--0-----3-----|--------------|--0-----------|--------------|
--------------|--------------|--0-----------|--------------|--------------|
                                                                           
--------------|--------------|--------------|--------------|----------0-1-|
--------------|--0-------1-0-|--------------|--2-----------|--3-------2-3-|
--2---2-----2-|------1-------|--2-----------|--3-----------|--2-----------|
----2-----2---|----2---0-----|--------------|--5-----------|--3-----------|
--0-----3-----|--------------|--0-0-0-0-0-0-|--0-0-0-0-0-0-|--0-0-0-0-0-0-|
--------------|--0-----------|--------------|--------------|--------------|
                                                                    
--1-------1---|--0-----------|-----------|----------|--------------|
--3-------3---|--1-----------|--3----1-0-|----------|------1---0---|
--1-------1---|--2-----------|-----------|--2----2--|--2-------1---|
--------------|--------------|--3----2-0-|--4-------|------2-------|
--0-0-0-0-0-0-|--0-0-0-0-0-0-|--0--------|--3----3--|--3-----------|
--------------|--------------|-----------|--5-------|--0-0-0-0-0-0-|
                                                                           
--------------|--------------|----------0-1-|--1-------1---|--1-----------|
--------------|--2-----------|--3-------2-3-|--3-------3---|--3-----------|
--2-----------|--3-----------|--2-----------|--------------|--------------|
--------------|--5-----------|--3-----------|--------------|--------------|
--3h0-0-0-0-0-|--0-0-0-0-0-0-|--0-0-0-0-0-0-|--0-0-0-0-0-0-|--1-1-1-1-1-1-|
--------------|--------------|--------------|--------------|--------------|
                                                                 
--------------|--------------|--------------|---------|---------|
--4-------3-1-|--------------|--------------|---------|--0------|
--0-----------|--3-------2---|--1-------1---|--2------|--1------|
----------3---|--0-------3---|--3-------3---|--2------|--2------|
--1-1-1-1-1-1-|--1-1-1-1-1-1-|--2-2-2-2-2-2-|--3------|---------|
--------------|--------------|--------------|---------|--0------|
                                                                       
------------0-------|------0----8-12-10h8----|------0----8-12-10h8----|
----------1---3h1-0-|----1---10-----------12-|----1---10-----------12-|
--------2-----------|--2---------------------|--2---------------------|
------2-------------|------------------------|------------------------|
--0h3---------0-----|--0-------------0-------|--0-------------0-------|
--------------------|------------------------|------------------------|
                                                                            
------------------------|--------------------|------0-------|--------------|
--11-10-9-8-----------3-|--2-1-0-------------|----4---0-3-1-|--------------|
------------11-10-9-8---|--------3-2-1-0-----|--------------|--2---2-----2-|
------------------------|----------------4-3-|--2-----------|----2-----2---|
--0---------------------|--------------------|--------------|--0-----3-----|
------------------------|--------------------|--------------|--------------|
                                                                           
--------------|----------0---|--0---0-------|--------------|--------------|
--0---------0-|--1---------4-|----4---0-3-1-|--------------|--0-------1-0-|
------1---1---|------2-------|--------------|--2---2-----2-|------1-------|
----2---2-----|----2---2-----|--------------|----2-----2---|----2---0-----|
--------------|--0-----------|--------------|--0-----3-----|--------------|
--0-----------|--------------|--------------|--------------|--0-----------|
                                                                           
--------------|--0-------1-0-|----------0---|--------------|------0---0---|
--------0-1-3-|------1-------|--3---0-----3-|--1-------3-1-|--0-----------|
--2---2-------|--------0-----|----0---------|------2-------|--------------|
----2---------|----2---------|--------3-----|----2---2-----|----2---2---2-|
--0-----------|--3-----------|--------------|--0-----------|--------------|
--------------|--------------|--3-----------|--------------|--0-----------|
                                                                            
--0---12---0---|--0---0---0---|--0---0-------|--------------|--------------|
---------4---4-|----4---4---4-|----4---0-3-1-|--------------|--0---------0-|
----9----------|--------------|--------------|--2---2-----2-|------1---1---|
---------------|--------------|--------------|----2-----2---|----2---2-----|
---------------|--------------|--------------|--0-----3-----|--------------|
---------------|--------------|--------------|--------------|--0-----------|
                                                                       
----------0---|--0---0-------|--------------|--------------|---------||
--1---------4-|----4---0-3-1-|--------------|--0-------1-0-|---------||
------2-------|--------------|--2---2-----2-|------1-------|--2------||
----2---2-----|--------------|----2-----2---|----2---0-----|---------||
--0-----------|--------------|--0-----3-----|--------------|--0------||
--------------|--------------|--------------|--0-----------|---------||

`
  );


    const ode_to_joy = new Song(
      'Ode to Joy', 3000,
      `
E|-0--0---1--3-|-3--1--0----|----------0-|-0--------|-0--0---1--3-|-3--1--0----|
B|-------------|-0--------3-|-1--1--3----|------3-3-|-------------|-0--------3-|
G|-0-----------|------------|----------0-|-0--------|-0-----------|------------|
D|--------0--2-|-2--0-------|-2--2--3----|--------3-|--------0--2-|-2--0-------|
A|-3--3--------|-------3--2-|-3----------|----------|-3--3--------|-------3--2-|
E|-------------|------------|------------|-3--------|-------------|------------|

E-|----------0-|----------||--------0----|----0-1-0----|----0-1-0----|----------0-|
B-|-1--1--3----|-3----1-1-||--3--3-----1-|-3---------1-|-3---------3-|-1--3-----1-|
G-|----------0-|----------||*-0-----0----|-0------0----|-0------1----|-2--2--0----|
D-|-2--2--3----|-3------2-||*------------|-------------|-------------|-------0----|
A-|-3----------|--------3-||--2-----3----|-2------3----|-2------2----|-0----------|
E-|------------|-3--------||-------------|-------------|-------------|----2--3----|

E-|-0--0--1--3-|-3--1--0----|----------0-|-----------|| |----------|
B-|-1-----3----|-0-----0--3-|-1--1--3----|-3----1-1--|| |-3----1-1-|
G-|------------|------------|-0--------0-|----------*|| |----------| Fine
D-|------------|------------|-2-----3----|-3------2-*|| |-3------2-|
A-|-3-----3----|------------|------------|--------3--|| |--------3-|
E-|------------|-3-----3----|------------|-3---------|| |-3--------|
      `
    );

    const london_bridge = new Song(
      'London Bridge', 3000,
      `
e|--0-----|-------|-------|-------|---0-----|-------|-----------------|
B|3---3-1-|-0-1-3-|---0-1-|-0-1-3-|-3---3-1-|-0-1-3-|---3-0-----------|
G|--------|-------|-2-----|-------|---------|-------|-2-----0---------|
D|--------|-------|-------|-------|---------|-------|-----------------|
A|--------|-------|-------|-------|---------|-------|-----------------|
E|--------|-------|-------|-------|---------|-------|-----------------|
`
    );


    const twinkle_twinkle = new Song(
      'Twinkle Twinkle', 5000,
      `
    E|----------------|----------------|
    B|----------------|----------------|
    G|----------------|----------------|
    D|----------------|----------------|
    A|----------------|----------------|
    E|--0-0-7-7-9-9-7-|-5-5-4-4-2-2-0--|

    E|----------------|----------------|
    B|----------------|----------------|
    G|----------------|----------------|
    D|----------------|----------------|
    A|----------------|----------------|
    E|--7-7-5-5-4-4-2-|--7-7-5-5-4-4-2-|

    E|----------------|----------------|
    B|----------------|----------------|
    G|----------------|----------------|
    D|----------------|----------------|
    A|----------------|----------------|
    E|--0-0-7-7-9-9-7-|-5-5-4-4-2-2-0--|
`
    );

    const twinkle_twinkle2 = new Song(
      'Twinkle Twinkle (2)', 12000,
      `
    e|----------0-0--------------------------------------------------------0-0-|
    b|------3-3-----3--1-1-0-0--------3-3-1-1-0-0----3-3-1-1-0-0--------3-3---3|
    g|--0-0---------------------2-2-0--------------2--------------2-0-0--------|
    d|-------------------------------------------------------------------------|
    a|-------------------------------------------------------------------------|
    E|-------------------------------------------------------------------------|

    e|---------------------------------|
    b|-1-1-0-0-------------------------|
    g|---------2-2-0-------------------|
    d|---------------------------------|
    a|---------------------------------|
    E|---------------------------------|
`
    );


    const mary_had_a_little_lamb = new Song(
      'Mary had a Little Lamb', 6000,
      `
    e|---------------------
    b|---------------------
    g|---------------------
    d|---------------------
    a|---------------------
    E|-4-2-0-2-4-4-4-2-2-2-

    e|-----------------------
    b|-----------------------
    g|-----------------------
    d|-----------------------
    a|-----------------------
    E|-4-4-4--4-2-0-2-4-4-4-4

    e|-----------------------
    b|-----------------------
    g|-----------------------
    d|-----------------------
    a|-----------------------
    E|-2-2-4-2-0-------------
`
    );


    const oh_susanna = new Song(
      'Oh Susanna', 9000,
      `
    e|---------0-0--2-0----------------------------------------------------------|
    B|-------2----------2-------------2-2----------------------------------------|
    G|---2-4--------------2---------4-----4-2-4----------------------------------|
    D|---------------------------------------------------------------------------|
    A|---------------------------------------------------------------------------|
    E|---------------------------------------------------------------------------|

    e|---------0-0--2-0----------------------------------------------------------|
    B|-------2---------2-------------2-2-----------------------------------------|
    G|---2-4-------------2---------4-----4-2-4-2---------------------------------|
    D|---------------------------------------------------------------------------|
    A|---------------------------------------------------------------------------|
    E|---------------------------------------------------------------------------|

    e|---------0-0--2-0----------------------------------------------------------|
    B|-------2---------2-------------2-2-----------------------------------------|
    G|---2-4-------------2---------4-----4-2-4-2-4-------------------------------|
    D|---------------------------------------------------------------------------|
    A|---------------------------------------------------------------------------|
    E|---------------------------------------------------------------------------|

    e|---------0-0--2-0----------------------------------------------------------|
    B|-------2---------2--------------2-2----------------------------------------|
    G|---2-4--------------2---------4-----4-4-2----------------------------------|
    D|---------------------------------------------------------------------------|
    A|---------------------------------------------------------------------------|
    E|---------------------------------------------------------------------------|

    e|---------0-0--2-0-----------------2-2-2-0-0--------------------------------|
    B|-------2----------2-----------3-3-----------2-----------2-2----------------|
    G|---2----------------2-4-----------------------2-4-----4-----4-4-2----------|
    D|---------------------------------------------------------------------------|
    A|---------------------------------------------------------------------------|
    E|---------------------------------------------------------------------------|
`
    );

    const stairway_to_heaven = new Song(
      'Stairway to Heaven', 3000,
      `
    E|-------5-7-----7-|-8-----8-2-----2-|-0---------0-----|-----------------|
    B|-----5-----5-----|---5-------3-----|---1---1-----1---|-0-1-1-----------|
    G|---5---------5---|-----5-------2---|-----2---------2-|-0-2-2-----------|
    D|-7-------6-------|-5-------4-------|-3---------------|-----------------|
    A|-----------------|-----------------|-----------------|-2-0-0---0--/8-7-|
    E|-----------------|-----------------|-----------------|-----------------|

    E|---------7-----7-|-8-----8-2-----2-|-0---------0-----|-----------------|
    B|-------5---5-----|---5-------3-----|---1---1-----1---|-0-1-1-----------|
    G|-----5-------5---|-----5-------2---|-----2---------2-|-0-2-2-----------|
    D|---7-----6-------|-5-------4-------|-3---------------|-----------------|
    A|-0---------------|-----------------|-----------------|-2-0-0-------0-2-|
    E|-----------------|-----------------|-----------------|-----------------|

    E|-------0-2-----2-|-0-----0----------|---------3-----3-|-3^2-2-2---------|
    B|-----------3-----|---1-----0h1------|-1-----1---0-----|-----3-3---------|
    G|-----0-------2---|-----2-------2----|---0---------0---|-----------------|
    D|---2-----0-------|-3----------------|-----2-----------|-0---0-0---------|
    A|-3---------------|---------0----0-2-|-3---------------|-------------0-2-|
    E|-----------------|------------------|---------3-------|-----------------|

    E|---------2-----2-|-0-----0----------|---------------2-|-0-0-0-----------|
    B|-------1---3-----|---1-----0-1------|-------1-----3---|-1-1-1-----------|
    G|-----0-------2---|-----2-------2----|-----0-----2-----|-2-2-2-----------|
    D|---2-----0-------|-3----------------|---2-----0-------|-3-3-3-----------|
    A|-3---------------|---------0----0-2-|-3---------------|-----------------|
    E|-----------------|------------------|-----------------|-----------------|
`
    );

    this.addSong(london_bridge);
    this.addSong(fur_elise);
    this.addSong(ode_to_joy);
    this.addSong(twinkle_twinkle);
    this.addSong(twinkle_twinkle2);
    this.addSong(mary_had_a_little_lamb);
    this.addSong(oh_susanna);
    this.addSong(stairway_to_heaven);
  }

}
