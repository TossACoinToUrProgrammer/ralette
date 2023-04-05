import React from 'react'
import { Box, Container } from '@mui/system'
import cn from 'classnames'

import styles from './styles.module.scss'
import gameImg from './images/standoff2.png'
import { Typography } from '@mui/material'

const AboutGameSection = () => {
    return (
        <Box className={cn(styles.sectionWrapper)}>
            <Container className={cn(styles.content)}>
                <Typography fontSize={24} align='center'>
                    <span className={styles.title}>Welcome to the exciting world of knight battles!</span> <br /> In this game, you will plunge into the medieval atmosphere, where you can transform into knights and engage in a furious battle with other players online or on the same computer! Victory depends on your skill and reaction!
                </Typography>
            </Container>
            <div className={styles.imageWrapper}>
                <img src={gameImg} alt='' />
            </div>
        </Box>
    )
}

export default AboutGameSection

