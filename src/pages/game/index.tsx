import React, { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import kaboom from 'kaboom'

import knightPNG from './knight.png'
import knightFramesPNG from './knight_frames_small.png'
import { Knight } from './Knight'

function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return

    const k = kaboom({
      global: false,
      canvas: canvasRef.current,
    })

    const player = new Knight(k, knightFramesPNG, { x: k.width() / 2, y: k.height() / 8 }, 'player');

    player.initKeyListeners();
  }, [])

  return (
    <Box pt='200px' bgcolor='teal' minHeight='100vh'>
      <canvas ref={canvasRef}></canvas>
    </Box>
  )
}

export default GamePage