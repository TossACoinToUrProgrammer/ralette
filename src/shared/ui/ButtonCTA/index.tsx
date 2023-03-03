import React, { FC } from 'react'
import Button from '@mui/material/Button';
import cn from 'classnames';

import styles from './styles.module.scss'

interface Props {
    className?: string,
    children: React.ReactNode,
    onClick: (props: any) => void
}

const ButtonCTA: FC<Props> = ({ className, children, onClick }) => {
    return (
        <Button variant='contained' className={cn(styles.button, className)} onClick={onClick}>{children}</Button>
    )
}

export default ButtonCTA
