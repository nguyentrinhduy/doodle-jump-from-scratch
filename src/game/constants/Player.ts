import { WINDOW_HEIGHT } from './Bounds'

export const PLAYER_START_VELOCITY: readonly [number, number] = [0, -0.95]
export const PLAYER_START_POSITION: readonly [number, number] = [70, WINDOW_HEIGHT + 10]
export const PLAYER_VELOCITY_DIRECTION = 0.4
export const PLAYER_START_VELOCITY_IN_START_SCENE: readonly [number, number] = [0, 0]
export const PLAYER_START_POSITION_IN_START_SCENE: readonly [number, number] = [100, -100]
export const PLAYER_START_VELOCITY_IN_PLAYING_SCENE: readonly [number, number] = [0, -1.5]
export const GRAVITY_ACCELERATION: readonly [number, number] = [0, 0.0015]
export const BULLET_UP_VELOCITY: readonly [number, number] = [0, -2]
export const PLAYER_SHOOTING_TIME = 300
export const BULLET_INITIAL_POSITION: readonly [number, number] = [40, 30]
