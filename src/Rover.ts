import Point from './Point';
import RoverOrientation from '../enums/RoverOrientation';
import RoverCommand from '../enums/RoverCommand';
import Terrain from './Terrain';

const FORWARD_MODIFIER = 0;
const BACKWARD_MODIFIER = Math.PI;
const RIGHT_MODIFIER = -1;
const LEFT_MODIFIER = 1;
const ORIENTATIONS_COUNT = 4;
const PI_OVER_TWO = Math.PI / 2;

class Rover {

  public roverOrientation: RoverOrientation;
  public position: Point;

  constructor(position: Point, roverOrientation: RoverOrientation) {
    this.position = position;
    this.roverOrientation = roverOrientation;
  }

  // Converts the orientations to radians and then calculates the
  // deltaX and deltaY to be applied.
  getVelocity(directionModifier: number): { x: number, y: number } {
    const orientation: number = (PI_OVER_TWO * Number(this.roverOrientation)) + directionModifier;
    return {x: Math.round(Math.cos(orientation)), y: -Math.round(Math.sin(orientation))};
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
          this.rotate(RIGHT_MODIFIER);
          break;
        case RoverCommand.LEFT:
          this.rotate(LEFT_MODIFIER);
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

  // Works by looping through the enumeration
  private rotate(directionModifier: number): void {
    const initialOrientation = Number(this.roverOrientation);
    this.roverOrientation = (initialOrientation + directionModifier + ORIENTATIONS_COUNT) % ORIENTATIONS_COUNT;
  }

}

export default Rover;