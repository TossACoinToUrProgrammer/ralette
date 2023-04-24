import React from 'react'

import styles from './styles.module.scss'

interface NewsCardProps {
    date: string
    imageUrl: string
    title: string
    description: string
}

const NewsCard: React.FC<NewsCardProps> = ({ date, title, imageUrl, description }) => {
    return (
        <div className={styles.card}>
            <img src={imageUrl} alt="news card image" />
            <div className={styles.cardContent}>
                <span className={styles.date}>{date}</span>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
            </div>

        </div>
    )
}

export default NewsCard