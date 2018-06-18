import Point from './Point';
import RoverOrientation from '../enums/RoverOrientation';
import RoverCommand from '../enums/RoverCommand';
import Terrain from './Terrain';

const FORWARD_MODIFIER = 1;
const BACKWARD_MODIFIER = -1;
const ORIENTATIONS_COUNT = 4;

class Rover {

  public roverOrientation: RoverOrientation;
  public position: Point;

  constructor(position: Point, roverOrientation: RoverOrientation) {
    this.position = position;
    this.roverOrientation = roverOrientation;
  }

  getVelocity(directionModifier: number): { x: number, y: number } {
    switch (this.roverOrientation) {
      case RoverOrientation.NORTH:
        return {
          x: 0,
          y: -1 * directionModifier,
        };
      case RoverOrientation.EAST:
        return {
          x: directionModifier,
          y: 0,
        };
      case RoverOrientation.SOUTH:
        return {
          x: 0,
          y: directionModifier,
        };
      case RoverOrientation.WEST:
        return {
          x: -1 * directionModifier,
          y: 0,
        };
      default:
        throw Error(`Unrecognized orientation ${RoverOrientation[this.roverOrientation]}`);
    }
  }

  execute(commands: RoverCommand[], terrain: Terrain): void {

    commands.forEach((command: RoverCommand) => {

      switch (command) {
        case RoverCommand.FORWARD:
          this.move(FORWARD_MODIFIER, terrain);
          break;
        case RoverCommand.BACKWARD:
          this.move(BACKWARD_MODIFIER, terrain);
          break;
        case RoverCommand.RIGHT:
          this.rotate(FORWARD_MODIFIER);
          break;
        case RoverCommand.LEFT:
          this.rotate(BACKWARD_MODIFIER);
          break;
        default:
          throw Error(`Unrecognized command ${RoverCommand[command]}`);
      }

    });

  }

  private move(directionModifier: number, terrain: Terrain): void {
    const velocity = this.getVelocity(directionModifier);
    const {x, y} = this.position;
    const {width, height} = terrain;

    const nextX = (x + velocity.x + width) % width;
    const nextY = (y + velocity.y + height) % height;

    this.position = new Point(nextX, nextY);
  }

  private rotate(directionModifier: number): void {
    const initialOrientation = Number(this.roverOrientation);
    this.roverOrientation = (initialOrientation + directionModifier + ORIENTATIONS_COUNT) % ORIENTATIONS_COUNT;
  }

}

export default Rover;