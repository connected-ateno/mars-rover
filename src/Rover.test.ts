import Rover from './Rover';
import RoverOrientation from '../enums/RoverOrientation';
import RoverCommand from '../enums/RoverCommand';
import Point from './Point';

const terrain = [
  ['          '], // ORIGIN: (0, 0) | TOP_EDGE: (4, 0)
  ['      O   '],
  ['          '], // LEFT_EDGE: (0, 2) | MIDDLE: (4, 2) | RIGHT_EDGE (9, 2)
  ['  O       '],
  ['          '], // BOTTOM_EDGE: (4, 4)
];

const ORIGIN = new Point(0, 0);

const LEFT_EDGE = new Point(0, 2);

describe('Rover', () => {

  describe('when constructing', () => {

    it('should initialize with correct state', () => {

      const rover = new Rover(ORIGIN, RoverOrientation.NORTH);
      expect(rover.position).toEqual({x: ORIGIN.x, y: ORIGIN.y});
      expect(rover.roverOrientation).toBe(RoverOrientation.NORTH);

    });

  });

  describe('from the LEFT_EDGE', () => {

    describe('facing NORTH', () => {

      describe('moving FORWARD', () => {

        it('should move one square north', () => {

          const rover = new Rover(LEFT_EDGE, RoverOrientation.NORTH);
          rover.execute([RoverCommand.FORWARD]);
          expect(rover.position).toEqual({x: LEFT_EDGE.x, y: LEFT_EDGE.y - 1});

        });

      });

      describe('moving BACKWARD', () => {

        it('should move one square south', () => {

          const rover = new Rover(LEFT_EDGE, RoverOrientation.NORTH);
          rover.execute([RoverCommand.BACKWARD]);
          expect(rover.position).toEqual({x: LEFT_EDGE.x, y: LEFT_EDGE.y + 1});

        });

      });

    });

    describe('facing EAST', () => {

      describe('moving FORWARD', () => {

        it('should move one square east', () => {

          const rover = new Rover(LEFT_EDGE, RoverOrientation.EAST);

          rover.execute([RoverCommand.FORWARD]);
          expect(rover.position).toEqual({x: LEFT_EDGE.x + 1, y: LEFT_EDGE.y});

        });

      });

      describe('moving BACKWARD', () => {

        it('should move one square west (looping)', () => {

          console.log('Not yet implemented');

        });

      });

    });

    describe('facing SOUTH', () => {

      describe('moving FORWARD', () => {

        it('should move one square to the south', () => {

          const rover = new Rover(LEFT_EDGE, RoverOrientation.SOUTH);
          rover.execute([RoverCommand.FORWARD]);
          expect(rover.position).toEqual({x: LEFT_EDGE.x, y: LEFT_EDGE.y + 1});

        });

      });

      describe('moving BACKWARD', () => {

        it('should move one square to the north', () => {

          const rover = new Rover(LEFT_EDGE, RoverOrientation.SOUTH);
          rover.execute([RoverCommand.BACKWARD]);
          expect(rover.position).toEqual({x: LEFT_EDGE.x, y: LEFT_EDGE.y - 1});

        });

      });

    });

    describe('facing WEST', () => {

      describe('moving FORWARD', () => {

        it('should move one square west (looping)', () => {
          console.log('Not yet implemented');
        });

      });

      describe('moving BACKWARD', () => {

        it('should move one square east', () => {

          const rover = new Rover(LEFT_EDGE, RoverOrientation.WEST);
          rover.execute([RoverCommand.BACKWARD]);
          expect(rover.position).toEqual({x: LEFT_EDGE.x + 1, y: LEFT_EDGE.y});

        });

      });

    });

  });

});