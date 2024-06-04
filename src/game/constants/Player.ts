import { Position } from '../../game-engine/game-objects/Position'
import { WINDOW_HEIGHT } from './Bounds'

export const PLAYER_START_VELOCITY = new Position(0, -0.95)
export const PLAYER_START_POSITION = new Position(70, WINDOW_HEIGHT + 10)
export const PLAYER_VELOCITY_DIRECTION = 0.4
export const PLAYER_START_VELOCITY_IN_START_SCENE = new Position(0, 0)
export const PLAYER_START_POSITION_IN_START_SCENE = new Position(100, -100)
export const PLAYER_START_VELOCITY_IN_PLAYING_SCENE = new Position(0, -1.5)
export const BULLET_UP_VELOCITY = new Position(0, -2)
export const PLAYER_SHOOTING_TIME = 300
export const BULLET_INITIAL_POSITION = new Position(40, 30)
