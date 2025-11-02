export interface Position {
  x: number;
  y: number;
}

export interface Boxer {
  id: 'blue' | 'yellow';
  position: Position;
  velocity: Position;
  width: number;
  height: number;
  health: number;
  maxHealth: number;
  color: string;
  isPunching: boolean;
  punchCooldown: number;
  facing: 'left' | 'right';
}

export interface GameState {
  boxers: {
    blue: Boxer;
    yellow: Boxer;
  };
  score: {
    blue: number;
    yellow: number;
  };
  isGameOver: boolean;
  winner: 'blue' | 'yellow' | null;
}

export interface Controls {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  punch: boolean;
}

export interface PlayerControls {
  blue: Controls;
  yellow: Controls;
}
