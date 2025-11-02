'use client';

import { useEffect, useRef, useState } from 'react';
import type { GameState, PlayerControls, Boxer, Position } from '@/types/game';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const GROUND_Y = 500;
const GRAVITY = 0.5;
const JUMP_FORCE = -12;
const MOVE_SPEED = 5;
const PUNCH_DAMAGE = 10;
const PUNCH_COOLDOWN = 30; // frames

export default function BoxingGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>(initGameState());
  const gameStateRef = useRef<GameState>(gameState);
  const controlsRef = useRef<PlayerControls>(initControls());
  const animationFrameRef = useRef<number>();

  function initGameState(): GameState {
    return {
      boxers: {
        blue: {
          id: 'blue',
          position: { x: 150, y: GROUND_Y - 80 },
          velocity: { x: 0, y: 0 },
          width: 40,
          height: 80,
          health: 100,
          maxHealth: 100,
          color: '#3B82F6',
          isPunching: false,
          punchCooldown: 0,
          facing: 'right'
        },
        yellow: {
          id: 'yellow',
          position: { x: 610, y: GROUND_Y - 80 },
          velocity: { x: 0, y: 0 },
          width: 40,
          height: 80,
          health: 100,
          maxHealth: 100,
          color: '#EAB308',
          isPunching: false,
          punchCooldown: 0,
          facing: 'left'
        }
      },
      score: {
        blue: 0,
        yellow: 0
      },
      isGameOver: false,
      winner: null
    };
  }

  function initControls(): PlayerControls {
    return {
      blue: { up: false, down: false, left: false, right: false, punch: false },
      yellow: { up: false, down: false, left: false, right: false, punch: false }
    };
  }

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Load game state from localStorage
  useEffect(() => {
    const savedScore = localStorage.getItem('boxingGameScore');
    if (savedScore) {
      const score = JSON.parse(savedScore);
      setGameState(prev => ({ ...prev, score }));
    }
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Blue player (WASD + Space)
      if (e.key === 'w') controlsRef.current.blue.up = true;
      if (e.key === 'a') controlsRef.current.blue.left = true;
      if (e.key === 's') controlsRef.current.blue.down = true;
      if (e.key === 'd') controlsRef.current.blue.right = true;
      if (e.key === ' ') {
        e.preventDefault();
        controlsRef.current.blue.punch = true;
      }

      // Yellow player (Arrow keys + Enter)
      if (e.key === 'ArrowUp') controlsRef.current.yellow.up = true;
      if (e.key === 'ArrowLeft') controlsRef.current.yellow.left = true;
      if (e.key === 'ArrowDown') controlsRef.current.yellow.down = true;
      if (e.key === 'ArrowRight') controlsRef.current.yellow.right = true;
      if (e.key === 'Enter') {
        e.preventDefault();
        controlsRef.current.yellow.punch = true;
      }

      // Reset game (R key)
      if (e.key === 'r' || e.key === 'R') {
        resetGame();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Blue player
      if (e.key === 'w') controlsRef.current.blue.up = false;
      if (e.key === 'a') controlsRef.current.blue.left = false;
      if (e.key === 's') controlsRef.current.blue.down = false;
      if (e.key === 'd') controlsRef.current.blue.right = false;
      if (e.key === ' ') controlsRef.current.blue.punch = false;

      // Yellow player
      if (e.key === 'ArrowUp') controlsRef.current.yellow.up = false;
      if (e.key === 'ArrowLeft') controlsRef.current.yellow.left = false;
      if (e.key === 'ArrowDown') controlsRef.current.yellow.down = false;
      if (e.key === 'ArrowRight') controlsRef.current.yellow.right = false;
      if (e.key === 'Enter') controlsRef.current.yellow.punch = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  function resetGame() {
    const newState = initGameState();
    newState.score = gameStateRef.current.score;
    setGameState(newState);
  }

  function updateBoxer(boxer: Boxer, controls: any): Boxer {
    const newBoxer = { ...boxer };

    // Update cooldowns
    if (newBoxer.punchCooldown > 0) {
      newBoxer.punchCooldown--;
    }

    // Horizontal movement
    if (controls.left) {
      newBoxer.velocity.x = -MOVE_SPEED;
      newBoxer.facing = 'left';
    } else if (controls.right) {
      newBoxer.velocity.x = MOVE_SPEED;
      newBoxer.facing = 'right';
    } else {
      newBoxer.velocity.x = 0;
    }

    // Jump
    const isOnGround = newBoxer.position.y >= GROUND_Y - newBoxer.height;
    if (controls.up && isOnGround) {
      newBoxer.velocity.y = JUMP_FORCE;
    }

    // Apply gravity
    if (!isOnGround) {
      newBoxer.velocity.y += GRAVITY;
    }

    // Update position
    newBoxer.position.x += newBoxer.velocity.x;
    newBoxer.position.y += newBoxer.velocity.y;

    // Ground collision
    if (newBoxer.position.y > GROUND_Y - newBoxer.height) {
      newBoxer.position.y = GROUND_Y - newBoxer.height;
      newBoxer.velocity.y = 0;
    }

    // Wall collision
    if (newBoxer.position.x < 0) newBoxer.position.x = 0;
    if (newBoxer.position.x > CANVAS_WIDTH - newBoxer.width) {
      newBoxer.position.x = CANVAS_WIDTH - newBoxer.width;
    }

    // Punch
    if (controls.punch && newBoxer.punchCooldown === 0) {
      newBoxer.isPunching = true;
      newBoxer.punchCooldown = PUNCH_COOLDOWN;
    } else {
      newBoxer.isPunching = false;
    }

    return newBoxer;
  }

  function checkCollision(b1: Boxer, b2: Boxer): boolean {
    const punchRange = b1.isPunching ? 30 : 0;
    const effectiveWidth = b1.width + punchRange;

    const x1 = b1.facing === 'right' ? b1.position.x : b1.position.x - punchRange;

    return (
      x1 < b2.position.x + b2.width &&
      x1 + effectiveWidth > b2.position.x &&
      b1.position.y < b2.position.y + b2.height &&
      b1.position.y + b1.height > b2.position.y
    );
  }

  function gameLoop() {
    const state = gameStateRef.current;
    if (state.isGameOver) return;

    const newState = { ...state };

    // Update boxers
    newState.boxers.blue = updateBoxer(state.boxers.blue, controlsRef.current.blue);
    newState.boxers.yellow = updateBoxer(state.boxers.yellow, controlsRef.current.yellow);

    // Check punch collisions
    if (newState.boxers.blue.isPunching && checkCollision(newState.boxers.blue, newState.boxers.yellow)) {
      newState.boxers.yellow.health = Math.max(0, newState.boxers.yellow.health - PUNCH_DAMAGE);
    }

    if (newState.boxers.yellow.isPunching && checkCollision(newState.boxers.yellow, newState.boxers.blue)) {
      newState.boxers.blue.health = Math.max(0, newState.boxers.blue.health - PUNCH_DAMAGE);
    }

    // Check game over
    if (newState.boxers.blue.health <= 0) {
      newState.isGameOver = true;
      newState.winner = 'yellow';
      newState.score.yellow++;
      localStorage.setItem('boxingGameScore', JSON.stringify(newState.score));
    } else if (newState.boxers.yellow.health <= 0) {
      newState.isGameOver = true;
      newState.winner = 'blue';
      newState.score.blue++;
      localStorage.setItem('boxingGameScore', JSON.stringify(newState.score));
    }

    setGameState(newState);
  }

  function render() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = gameStateRef.current;

    // Clear canvas - black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw center line
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw ground
    ctx.fillStyle = '#6B7280';
    ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y);

    // Draw boxers
    function drawBoxer(boxer: Boxer) {
      // Body
      ctx.fillStyle = boxer.color;
      ctx.fillRect(boxer.position.x, boxer.position.y, boxer.width, boxer.height);

      // Head
      ctx.fillRect(
        boxer.position.x + boxer.width / 4,
        boxer.position.y - 20,
        boxer.width / 2,
        20
      );

      // Punch animation
      if (boxer.isPunching) {
        ctx.fillStyle = '#FFFFFF';
        const punchX = boxer.facing === 'right'
          ? boxer.position.x + boxer.width
          : boxer.position.x - 25;
        ctx.fillRect(punchX, boxer.position.y + 20, 25, 10);
      }
    }

    drawBoxer(state.boxers.blue);
    drawBoxer(state.boxers.yellow);

    // Draw health bars
    function drawHealthBar(boxer: Boxer, x: number) {
      const barWidth = 150;
      const barHeight = 20;
      const y = 20;

      // Background
      ctx.fillStyle = '#374151';
      ctx.fillRect(x, y, barWidth, barHeight);

      // Health
      const healthWidth = (boxer.health / boxer.maxHealth) * barWidth;
      ctx.fillStyle = boxer.color;
      ctx.fillRect(x, y, healthWidth, barHeight);

      // Border
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, barWidth, barHeight);

      // Text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${boxer.id.toUpperCase()}: ${boxer.health}`, x + barWidth / 2, y - 5);
    }

    drawHealthBar(state.boxers.blue, 50);
    drawHealthBar(state.boxers.yellow, CANVAS_WIDTH - 200);

    // Draw score
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(
      `SCORE - Blue: ${state.score.blue} | Yellow: ${state.score.yellow}`,
      CANVAS_WIDTH / 2,
      70
    );

    // Draw game over
    if (state.isGameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '48px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(
        `${state.winner?.toUpperCase()} WINS!`,
        CANVAS_WIDTH / 2,
        CANVAS_HEIGHT / 2 - 30
      );

      ctx.font = '24px monospace';
      ctx.fillText(
        'Press R to play again',
        CANVAS_WIDTH / 2,
        CANVAS_HEIGHT / 2 + 30
      );
    }
  }

  useEffect(() => {
    function frame() {
      gameLoop();
      render();
      animationFrameRef.current = requestAnimationFrame(frame);
    }

    animationFrameRef.current = requestAnimationFrame(frame);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
      backgroundColor: '#000000',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#FFFFFF', fontFamily: 'monospace', fontSize: '32px' }}>
        2D BOXING GAME
      </h1>

      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{
          border: '4px solid #FFFFFF',
          backgroundColor: '#000000'
        }}
      />

      <div style={{
        color: '#FFFFFF',
        fontFamily: 'monospace',
        textAlign: 'center',
        maxWidth: '800px'
      }}>
        <h3>CONTROLS</h3>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
          <div style={{ color: '#3B82F6' }}>
            <strong>BLUE PLAYER</strong>
            <div>WASD - Move</div>
            <div>SPACE - Punch</div>
          </div>
          <div style={{ color: '#EAB308' }}>
            <strong>YELLOW PLAYER</strong>
            <div>Arrow Keys - Move</div>
            <div>ENTER - Punch</div>
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <strong>R</strong> - Reset Game
        </div>
      </div>
    </div>
  );
}
