import React, { PropsWithChildren } from 'react'
import cn from 'classnames'

import styles from './styles.module.scss'

const Container: React.FC<PropsWithChildren & { className?: string }> = ({ children, className }) => {
    return (
        <div className={cn(styles.container, className)}>{children}</div>
    )
}

export default Container