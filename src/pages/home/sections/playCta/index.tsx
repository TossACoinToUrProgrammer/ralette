import React from 'react'
import { Box } from '@mui/material'

import styles from './styles.module.scss'
import shieldImg from './assets/images/shield.png'

const PlayCTA = () => {
    return (
        <Box>
            <img src={shieldImg} alt="" />
            Let's Play!</Box>
    )
}

export default PlayCTA
