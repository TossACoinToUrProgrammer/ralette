import React from 'react'
import styles from './styles.module.scss'
import { IUpdatesItem, IUpdatesList } from 'shared/types'
import { Container } from '@mui/material'
import UpdatesItem from 'entities/updates-item'

const array = [
    {
        id: 0,
        title: 'Обновление Dota 2 — 17 марта 2023 года',
        date: '18 МАРТА 2023 Г.',
        subtitle: 'Обновление баланса',
        updates: [{
            title: 'Моржогр',
            changes: ['Радиус области приземления увеличен с 200 до 250', 'Урон за уровень увеличен с 15 до 25'],
        }]
    },
    {
        id: 1,
        title: 'Обновление Dota 2 — 15 марта 2023 года',
        date: '15 МАРТА 2023 Г.',
        subtitle: '',
        updates: [{
            title: 'Моржогр',
            changes: ['Радиус области приземления увеличен с 200 до 250', 'Урон за уровень увеличен с 15 до 25'],
        }]
    },
    {
        id: 2,
        title: 'Обновление Dota 2 — 28 февраля 2023 года',
        date: '28 ФЕВРАЛЯ 2023 Г.',
        subtitle: '',
        updates: [{
            title: 'Моржогр',
            changes: ['Радиус области приземления увеличен с 200 до 250', 'Урон за уровень увеличен с 15 до 25'],
        }]
    },
]

interface UpdatesListProps {
    updates: IUpdatesItem[]
}

const UpdatesList: React.FC<UpdatesListProps> = ({ updates }) => {
    return (
        <div className={styles.updatesWrapper}>
            <Container>
                {array.map(item => <UpdatesItem key={item.id} update={item} />)}
            </Container>
        </div>
    )
}

export default UpdatesList