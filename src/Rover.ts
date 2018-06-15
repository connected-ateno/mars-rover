import Point from './Point';
import RoverOrientation from '../enums/RoverOrientation';
import RoverCommand from '../enums/RoverCommand';

const FORWARD_MODIFIER = 1;
const BACKWARD_MODIFIER = -1;

class Rover {

  public roverOrientation: RoverOrientation;
  public position: Point;

  constructor(position: Point, roverOrientation: RoverOrientation) {
    this.position = position;
    this.roverOrientation = roverOrientation;
  }

  getMovementDelta(modifier: number) {
    switch (this.roverOrientation) {
      case RoverOrientation.NORTH:
        return {
          x: 0,
          y: -1 * modifier,
        };
      case RoverOrientation.EAST:
        return {
          x: modifier,
          y: 0,
        };
      case RoverOrientation.SOUTH:
        return {
          x: 0,
          y: modifier,
        };
      case RoverOrientation.WEST:
        return {
          x: -1 * modifier,
          y: 0,
        };
      default:
        throw Error(`Unrecognized orientation ${RoverOrientation[this.roverOrientation]}`);
    }
  }

  execute(commands: RoverCommand[]) {

    commands.forEach((command: RoverCommand) => {

      switch (command) {
        case RoverCommand.FORWARD:
          this.move(FORWARD_MODIFIER);
          break;
        case RoverCommand.BACKWARD:
          this.move(BACKWARD_MODIFIER);
          break;
        default:
          throw Error(`Unrecognized command ${RoverCommand[command]}`);
      }

    });

  }

  private move(modifier: number) {
    const movementDelta = this.getMovementDelta(modifier);
    const {x, y} = this.position;
    this.position = new Point(x + movementDelta.x, y + movementDelta.y);
  }

}

export default Rover;