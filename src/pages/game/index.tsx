import React, { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import kaboom from 'kaboom'

import knightPNG from './knight.png'
import knightFramesPNG from './knight_frames_small.png'
import { Knight } from './Knight'
import { GameController } from './GameController'

function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return

    const controller = new GameController({
      global: false,
      canvas: canvasRef.current,
    })

    controller.start()
  }, [])

  return (
    <Box pt='200px' bgcolor='teal' minHeight='100vh'>
      <canvas ref={canvasRef}></canvas>
    </Box>
  )
}

export default GamePage