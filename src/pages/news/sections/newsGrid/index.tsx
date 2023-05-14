import React from 'react'
import styles from './styles.module.scss'
import { Container } from '@mui/material'
import NewsCard from 'entities/news-card'
import { useAppSelector } from 'app/hooks/storeHooks'
const array = [
  {
    date: '25 МАРТА 2023 Г.',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/clans/3703047/15c0a66aaaad0a515b73272e52f134c5629f5952.png',
    title: 'Весна 2023 — призыв к оружию',
    description: 'Муэрта прибыла в обновлении «Смертная расплата», а значит, настало время нацелиться на будущее. В связи с этим команда Dota 2 вновь взывает ко всем творцам Мастерской в поисках...'
  },
  {
    date: '25 МАРТА 2023 Г.',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/clans/3703047/15c0a66aaaad0a515b73272e52f134c5629f5952.png',
    title: 'Весна 2023 — призыв к оружию',
    description: 'Муэрта прибыла в обновлении «Смертная расплата», а значит, настало время нацелиться на будущее. В связи с этим команда Dota 2 вновь взывает ко всем творцам Мастерской в поисках...'
  },
  {
    date: '25 МАРТА 2023 Г.',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/clans/3703047/15c0a66aaaad0a515b73272e52f134c5629f5952.png',
    title: 'Весна 2023 — призыв к оружию',
    description: 'Муэрта прибыла в обновлении «Смертная расплата», а значит, настало время нацелиться на будущее. В связи с этим команда Dota 2 вновь взывает ко всем творцам Мастерской в поисках...'
  },
  {
    date: '25 МАРТА 2023 Г.',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/clans/3703047/15c0a66aaaad0a515b73272e52f134c5629f5952.png',
    title: 'Весна 2023 — призыв к оружию',
    description: 'Муэрта прибыла в обновлении «Смертная расплата», а значит, настало время нацелиться на будущее. В связи с этим команда Dota 2 вновь взывает ко всем творцам Мастерской в поисках...'
  },
  {
    date: '25 МАРТА 2023 Г.',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/clans/3703047/15c0a66aaaad0a515b73272e52f134c5629f5952.png',
    title: 'Весна 2023 — призыв к оружию',
    description: 'Муэрта прибыла в обновлении «Смертная расплата», а значит, настало время нацелиться на будущее. В связи с этим команда Dota 2 вновь взывает ко всем творцам Мастерской в поисках...'
  },
  {
    date: '25 МАРТА 2023 Г.',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/clans/3703047/15c0a66aaaad0a515b73272e52f134c5629f5952.png',
    title: 'Весна 2023 — призыв к оружию',
    description: 'Муэрта прибыла в обновлении «Смертная расплата», а значит, настало время нацелиться на будущее. В связи с этим команда Dota 2 вновь взывает ко всем творцам Мастерской в поисках...'
  },
]
const NewsGrid = () => {
  const { news, loading } = useAppSelector(state => state.news)

  return (
    <div className={styles.gridWrapper}>
      <Container className={styles.grid}>
        {loading && <div>Loading...</div>}
        {news.map(item => <NewsCard key={item.title} title={item.title} date={item.date} imageUrl={item.imageUrl} description={item.description} />)}
      </Container>
    </div>
  )
}

export default NewsGrid
