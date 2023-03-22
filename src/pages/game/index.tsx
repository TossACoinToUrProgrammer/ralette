import React, { useEffect, useRef, useState } from 'react'
import { Box, Grid } from '@mui/material'
import kaboom from 'kaboom'

import knightPNG from './knight.png'
import knightFramesPNG from './knight_frames_small.png'
import { Knight } from './Knight'
import { GameController } from './GameController'

function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [healthBars, setHealthBars] = useState<[number, number]>([8, 8])

  useEffect(() => {
    if (!canvasRef.current) return

    let canvasScale = 1

    if (window.innerWidth < 1320 || (window.innerHeight - 200) < 1320) {
      canvasScale = (window.innerHeight - 200) > window.innerWidth ? window.innerWidth / 1320 : (window.innerHeight - 200) / 1320
    }
    const controller = new GameController({
      global: false,
      canvas: canvasRef.current,
      width: 1320,
      height: 1320,
      scale: canvasScale
    })

    controller.start()

    controller.onHpUpdate(setHealthBars)
  }, [])

  return (
    <Box pt='200px' bgcolor='teal' height='100vh' overflow='hidden' position='relative'>
      <Box position='absolute' bottom={0} left={0} right={0} height={30} sx={{ backgroundColor: "gray" }} display={'flex'} justifyContent='space-between'>
        <Box sx={{ backgroundColor: "red", width: healthBars[1] * 6.25 + '%', border: "2px solid black" }}></Box>
        <Box sx={{ backgroundColor: "red", width: healthBars[0] * 6.25 + '%', border: "2px solid black" }}></Box>
      </Box>
      <Grid display='flex' justifyContent='center'>
        <canvas ref={canvasRef}></canvas>
      </Grid>
    </Box>
  )
}

export default GamePage