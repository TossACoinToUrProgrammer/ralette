import React from 'react'
import { useNavigate } from 'react-router'
import { Box } from '@mui/material'

import styles from './styles.module.scss'
import shieldImg from './assets/images/shield.png'
import ButtonCTA from 'shared/ui/ButtonCTA'

const PlayCTA = () => {
    const navigate = useNavigate()

    return (
        <Box className={styles.playCtaWrapper}>
            <div className={styles.imageWrapper}>
                <img className={styles.shieldImg} src={shieldImg} alt="" />
                <ButtonCTA className={styles.button} onClick={() => navigate('/game')}>Let's Play!</ButtonCTA>
            </div>
        </Box>
    )
}

export default PlayCTA
