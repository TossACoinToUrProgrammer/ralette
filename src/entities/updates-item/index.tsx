import React from 'react'
import styles from './styles.module.scss'

import { IUpdatesItem } from 'shared/types'

interface UpdatesItemProps {
    update: IUpdatesItem
}

const UpdatesItem: React.FC<UpdatesItemProps> = ({ update }) => {
    return (
        <div className={styles.updatesItem}>
            <p className={styles.date}>{update.date}</p>
            <h4 className={styles.title}>{update.title}</h4>
            <h5 className={styles.subtitle}>{update.subtitle}</h5>
            {update.updates?.map(item =>
                <div key={item.title} className={styles.changes}>
                    <span className={styles.changesTitle}>{item.title}</span>: <br />
                    <ul>
                        {item.changes.map(change => <li key={change}>{change}</li>)}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default UpdatesItem
    