import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'

import styles from './styles.module.scss'
import Headline from './sections/headline'
import Tabs from './sections/tabs'
import NewsGrid from './sections/newsGrid'
import UpdatesList from './sections/updatesList'
import { useAppDispatch, useAppSelector } from 'app/hooks/storeHooks'
import { fetchNews } from 'store/slices/newsSlice'

const NewsPage = () => {
    const [activeTab, setActiveTab] = useState(0)

    const { news } = useAppSelector(state => state.news)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!news.length) {
            dispatch(fetchNews())
        }
    }, [news.length])

    return (
        <Box className={styles.wrapper}>
            <Headline />
            <Tabs value={activeTab} onChange={setActiveTab} />
            {activeTab === 0 && <NewsGrid />}
            {activeTab === 1 && <UpdatesList />}
        </Box>
    )
}

export default NewsPage