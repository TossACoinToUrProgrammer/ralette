import React, { useEffect } from 'react'
import { Container } from '@mui/material'

import styles from './styles.module.scss'
import UpdatesItem from 'entities/updates-item'
import { useAppDispatch, useAppSelector } from 'app/hooks/storeHooks'
import { fetchUpdates } from 'store/slices/updatesSlice'

const UpdatesList: React.FC = () => {
    const { loading, updates } = useAppSelector(state => state.updates)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!updates.length) {
            dispatch(fetchUpdates())
        }
    }, [updates])
    
    return (
        <div className={styles.updatesWrapper}>
            {loading && <div>Loading ...</div>}
            <Container>
                {updates.map(item => <UpdatesItem key={item._id} update={item} />)}
            </Container>
        </div>
    )
}

export default UpdatesList