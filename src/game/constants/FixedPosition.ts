import { Position } from '../../game-engine/game-objects/Position'
import { WINDOW_HEIGHT } from './Bounds'

// buttons
export const PLAY_BUTTON_POSITION = new Position(70, 500)
export const RESUME_BUTTON_POSITION = new Position(590, 0)
export const PAUSE_BUTTON_POSITION = new Position(580, 0)
export const SCORES_BUTTON_POSITION = []
export const OPTIONS_BUTTON_POSITION = []
export const PLAY_AGAIN_BUTTON_POSITION = new Position(60, 650)
export const MENU_BUTTON_POSITION = new Position(350, 650)

// background
export const BACKGROUND_POSITION = new Position(0, 0)
export const TOP_BACKGROUND_POSITION = new Position(0, 0)
export const BOTTOM_BACKGROUND_POSITION = new Position(0, WINDOW_HEIGHT - 50)

// other components
export const LAND_POSITION_IN_START_SCENE = new Position(120, 650)
export const GAME_OVER_POSITION = new Position(100, 100)
export const SCORE_POSITION = new Position(0, 50)
export const YOUR_SCORE_POSITION = new Position(60, 350)
export const YOUR_HIGH_SCORE_POSITION = new Position(60, 440)
export const YOUR_NAME_POSITION = new Position(60, 530)
