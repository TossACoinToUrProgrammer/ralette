import React, { useState } from 'react'
import { Box } from '@mui/material'
import styles from './styles.module.scss'

import Headline from './sections/headline'
import Tabs from './sections/tabs'
import NewsGrid from './sections/newsGrid'

const NewsPage = () => {
    const [activeTab, setActiveTab] = useState(0)


    return (
        <Box className={styles.wrapper}>
            <Headline />
            <Tabs value={activeTab} onChange={setActiveTab} />
            {activeTab === 0 && <NewsGrid />}
            {activeTab === 1 && "Updates"}
            
        </Box>
    )
}

export default NewsPage