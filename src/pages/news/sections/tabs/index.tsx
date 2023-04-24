import React from 'react'
import { Container } from '@mui/material'

import styles from './styles.module.scss'
import cn from 'classnames'

interface TabsProps {
  value: number
  onChange: (k: number) => void
}

const Tabs: React.FC<TabsProps> = ({ value, onChange }) => {
  return (
    <div className={styles.tabs}>
      <Container className={styles.tabsContainer}>
        <button className={cn(styles.tab, { [styles.active]: value === 0 })} onClick={() => onChange(0)}>News</button>
        <button className={cn(styles.tab, { [styles.active]: value === 1 })} onClick={() => onChange(1)}>Updates</button>
      </Container>
    </div>
  )
}

export default Tabs