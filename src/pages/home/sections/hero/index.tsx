import React, { useEffect } from 'react'
import { Box, Container } from '@mui/material'
import { gsap } from "gsap";

import styles from './styles.module.scss'


const HeroSection = () => {

    useEffect(() => {
        const pinnedAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: `.${styles.heroWrapper}`,
                scrub: 2,
                start: 'top top',
                end: '+=400px',
                pin: true,
            }
        })

        pinnedAnimation
            .fromTo(`.${styles.leftImage}`, { transform: 'scale(1.1)' }, { transform: 'translateX(-100px) scale(1)' })
            .fromTo(`.${styles.rightImage}`, { transform: 'scale(1.1)' }, { transform: 'translateX(100px) scale(1)' }, '<')
            .fromTo(`.${styles.centerImage}`, { transform: 'scale(1)' }, { transform: 'translateY(-30px) translateX(30px) scale(1.07)' }, '<')


        //parallax effect on scroll for centerImage and wrapper background
        const backgroundFixedAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: `.${styles.heroWrapper}`,
                start: 'top top ',
                end: '+=100%',
                scrub: true
            }
        })

        backgroundFixedAnimation
            .fromTo(`.${styles.heroWrapper}`, { backgroundPositionY: '0' }, { backgroundPositionY: '30vh' })
            .fromTo(`.${styles.centerImage}`, { backgroundPositionY: '0' }, { backgroundPositionY: '20vh' }, '<')
    }, [])

    return (
        <Box className={styles.heroWrapper} pt='200px'>
            <div className={styles.centerImage}></div>
            <div className={styles.leftImage}></div>
            <div className={styles.rightImage}></div>
            <Container className={styles.hero}>
            </Container>
        </Box>
    )
}

export default HeroSection