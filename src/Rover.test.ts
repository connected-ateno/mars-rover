import Rover from './Rover';
import RoverOrientation from '../enums/RoverOrientation';
import RoverCommand from '../enums/RoverCommand';
import Point from './Point';
import Terrain from './Terrain';

// LEGEND
// O - Obstacle

const map = [
  '          ', // ORIGIN: (0, 0) | TOP_EDGE: (4, 0)
  '      O   ',
  '          ', // LEFT_EDGE: (0, 2) | MIDDLE: (4, 2) | RIGHT_EDGE (9, 2)
  '  O       ',
  '          ', // BOTTOM_EDGE: (4, 4)
];

const TERRAIN = new Terrain(map);

const ORIGIN = new Point(0, 0);

const MIDDLE = new Point(4, 2);
const LEFT_EDGE = new Point(0, 2);
const RIGHT_EDGE = new Point(9, 2);
const TOP_EDGE = new Point(4, 0);
const BOTTOM_EDGE = new Point(4, 4);

describe('Rover', () => {

  describe('when constructing', () => {

    it('should initialize with correct state', () => {

      const rover = new Rover(ORIGIN, RoverOrientation.NORTH);
      expect(rover.position).toEqual({x: ORIGIN.x, y: ORIGIN.y});
      expect(rover.roverOrientation).toBe(RoverOrientation.NORTH);

    });

  });

  describe('when the rover is in the MIDDLE', () => {

    describe('facing NORTH', () => {

      describe('moving FORWARD', () => {

        it('should move one square north', () => {

          const rover = new Rover(MIDDLE, RoverOrientation.NORTH);
          rover.execute([RoverCommand.FORWARD], TERRAIN);
          expect(rover.position).toEqual({x: MIDDLE.x, y: MIDDLE.y - 1});

        });

      });

      describe('moving BACKWARD', () => {

        it('should move one square south', () => {

          const rover = new Rover(MIDDLE, RoverOrientation.NORTH);
          rover.execute([RoverCommand.BACKWARD], TERRAIN);
          expect(rover.position).toEqual({x: MIDDLE.x, y: MIDDLE.y + 1});

        });

      });

    });

    describe('facing EAST', () => {

      describe('moving FORWARD', () => {

        it('should move one square east', () => {

          const rover = new Rover(MIDDLE, RoverOrientation.EAST);
          rover.execute([RoverCommand.FORWARD], TERRAIN);
          expect(rover.position).toEqual({x: MIDDLE.x + 1, y: MIDDLE.y});

        });

      });

      describe('moving BACKWARD', () => {

        it('should move one square west ', () => {

          const rover = new Rover(MIDDLE, RoverOrientation.EAST);
          rover.execute([RoverCommand.BACKWARD], TERRAIN);
          expect(rover.position).toEqual({x: MIDDLE.x - 1, y: MIDDLE.y});

        });

      });

    });

    describe('facing SOUTH', () => {

      describe('moving FORWARD', () => {

        it('should move one square south', () => {

          const rover = new Rover(MIDDLE, RoverOrientation.SOUTH);
          rover.execute([RoverCommand.FORWARD], TERRAIN);
          expect(rover.position).toEqual({x: MIDDLE.x, y: MIDDLE.y + 1});

        });

      });

      describe('moving BACKWARD', () => {

        it('should move one square north', () => {

          const rover = new Rover(MIDDLE, RoverOrientation.SOUTH);
          rover.execute([RoverCommand.BACKWARD], TERRAIN);
          expect(rover.position).toEqual({x: MIDDLE.x, y: MIDDLE.y - 1});

        });

      });

    });

    describe('facing WEST', () => {

      describe('moving FORWARD', () => {

        it('should move one square west', () => {

          const rover = new Rover(MIDDLE, RoverOrientation.WEST);
          rover.execute([RoverCommand.FORWARD], TERRAIN);
          expect(rover.position).toEqual({x: MIDDLE.x - 1, y: MIDDLE.y});

        });

      });

      describe('moving BACKWARD', () => {

        it('should move one square east', () => {

          const rover = new Rover(MIDDLE, RoverOrientation.WEST);
          rover.execute([RoverCommand.BACKWARD], TERRAIN);
          expect(rover.position).toEqual({x: MIDDLE.x + 1, y: MIDDLE.y});

        });

      });

    });

  });

  describe('when the rover is at the LEFT_EDGE', () => {

    describe('facing EAST', () => {

      describe('moving BACKWARD', () => {

        it('should move one square west (looping)', () => {

          const rover = new Rover(LEFT_EDGE, RoverOrientation.EAST);
          rover.execute([RoverCommand.BACKWARD], TERRAIN);
          expect(rover.position).toEqual({x: RIGHT_EDGE.x, y: RIGHT_EDGE.y});

        });

      });

    });

    describe('facing WEST', () => {

      describe('moving FORWARD', () => {

        it('should move one square west (looping)', () => {

          const rover = new Rover(LEFT_EDGE, RoverOrientation.WEST);
          rover.execute([RoverCommand.FORWARD], TERRAIN);
          expect(rover.position).toEqual({x: RIGHT_EDGE.x, y: RIGHT_EDGE.y});

        });

      });

    });

  });

  describe('when the rover is at the RIGHT_EDGE', () => {

    describe('facing EAST', () => {

      describe('moving FORWARD', () => {

        it('should move one square east (looping)', () => {

          const rover = new Rover(RIGHT_EDGE, RoverOrientation.EAST);
          rover.execute([RoverCommand.FORWARD], TERRAIN);
          expect(rover.position).toEqual({x: LEFT_EDGE.x, y: LEFT_EDGE.y});

        });

      });

    });

    describe('facing WEST', () => {

      describe('moving BACKWARD', () => {

        it('should move one square east (looping', () => {

          const rover = new Rover(RIGHT_EDGE, RoverOrientation.EAST);
          rover.execute([RoverCommand.FORWARD], TERRAIN);
          expect(rover.position).toEqual({x: LEFT_EDGE.x, y: LEFT_EDGE.y});

        });

      });

    });

  });

  describe('when the rover is at the TOP_EDGE', () => {

    describe('facing NORTH', () => {

      describe('moving FORWARD', () => {

        it('should move one square north (looping)', () => {

          const rover = new Rover(TOP_EDGE, RoverOrientation.NORTH);
          rover.execute([RoverCommand.FORWARD], TERRAIN);
          expect(rover.position).toEqual({x: BOTTOM_EDGE.x, y: BOTTOM_EDGE.y});

        });

      });

    });

    describe('facing SOUTH', () => {

      describe('moving BACKWARD', () => {

        it('should move one square north (looping)', () => {

          const rover = new Rover(TOP_EDGE, RoverOrientation.NORTH);
          rover.execute([RoverCommand.FORWARD], TERRAIN);
          expect(rover.position).toEqual({x: BOTTOM_EDGE.x, y: BOTTOM_EDGE.y});

        });

      });

    });

  });

  describe('when the rover is at the BOTTOM_EDGE', () => {

    describe('facing NORTH', () => {

      describe('moving BACKWARD', () => {

        it('should move one square south (looping)', () => {

          const rover = new Rover(BOTTOM_EDGE, RoverOrientation.NORTH);
          rover.execute([RoverCommand.BACKWARD], TERRAIN);
          expect(rover.position).toEqual({x: TOP_EDGE.x, y: TOP_EDGE.y});

        });

      });

    });

    describe('facing SOUTH', () => {

      describe('moving FORWARD', () => {

        it('should move one square south (looping)', () => {

          const rover = new Rover(BOTTOM_EDGE, RoverOrientation.NORTH);
          rover.execute([RoverCommand.BACKWARD], TERRAIN);
          expect(rover.position).toEqual({x: TOP_EDGE.x, y: TOP_EDGE.y});

        });

      });

    });

  });

  describe('when turning', () => {

    describe('to the RIGHT', () => {

      it('should turn from NORTH to EAST', () => {

        const rover = new Rover(ORIGIN, RoverOrientation.NORTH);
        rover.execute([RoverCommand.RIGHT], TERRAIN);
        expect(rover.roverOrientation).toEqual(RoverOrientation.EAST);

      });

      it('should turn from EAST to SOUTH', () => {

        const rover = new Rover(ORIGIN, RoverOrientation.EAST);
        rover.execute([RoverCommand.RIGHT], TERRAIN);
        expect(rover.roverOrientation).toEqual(RoverOrientation.SOUTH);

      });

      it('should turn from SOUTH to WEST', () => {

        const rover = new Rover(ORIGIN, RoverOrientation.SOUTH);
        rover.execute([RoverCommand.RIGHT], TERRAIN);
        expect(rover.roverOrientation).toEqual(RoverOrientation.WEST);

      });

      it('should turn from WEST to NORTH', () => {

        const rover = new Rover(ORIGIN, RoverOrientation.WEST);
        rover.execute([RoverCommand.RIGHT], TERRAIN);
        expect(rover.roverOrientation).toEqual(RoverOrientation.NORTH);

      });

    });

    describe('to the LEFT', () => {

      it('should turn from EAST to NORTH', () => {

        const rover = new Rover(ORIGIN, RoverOrientation.EAST);
        rover.execute([RoverCommand.LEFT], TERRAIN);
        expect(rover.roverOrientation).toEqual(RoverOrientation.NORTH);

      });

      it('should turn from SOUTH to EAST', () => {

        const rover = new Rover(ORIGIN, RoverOrientation.SOUTH);
        rover.execute([RoverCommand.LEFT], TERRAIN);
        expect(rover.roverOrientation).toEqual(RoverOrientation.EAST);

      });

      it('should turn from WEST to SOUTH', () => {

        const rover = new Rover(ORIGIN, RoverOrientation.WEST);
        rover.execute([RoverCommand.LEFT], TERRAIN);
        expect(rover.roverOrientation).toEqual(RoverOrientation.SOUTH);

      });

      it('should turn from NORTH to WEST', () => {

        const rover = new Rover(ORIGIN, RoverOrientation.NORTH);
        rover.execute([RoverCommand.LEFT], TERRAIN);
        expect(rover.roverOrientation).toEqual(RoverOrientation.WEST);

      });

    });

  });

});