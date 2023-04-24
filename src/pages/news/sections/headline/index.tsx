import React from 'react'
import { Container } from '@mui/material'

import styles from './styles.module.scss'

interface HeadlineProps {
    title: string
    date: string
    linkUrl: string
    imageUrl: string
}

const Headline = () => {
    return (
        <div className={styles.headlineWrapper}> 
            <img className={styles.image} src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/clans/3703047/15c0a66aaaad0a515b73272e52f134c5629f5952.png" alt="" />
            <Container className={styles.headlineContent}>
                <div className={styles.date}>25 марта 2023 г. </div>
                <h1 className={styles.title}>Весна 2023 — призыв к оружию</h1>
                <div>Подробнее</div>
            </Container>
        </div>
    )
}

export default Headline
