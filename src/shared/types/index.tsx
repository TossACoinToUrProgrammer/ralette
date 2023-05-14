interface IUpdatesItem {
    _id: string,
    title: string,
    date: string,
    subtitle?: string,
    updates?: {
        title?: string,
        changes: string[],
    }[]
}

interface IUpdatesList {
    items: IUpdatesItem[]
}

interface INewsItem {
    _id: string,
    title: string,
    date: string,
    imageUrl: string,
    description: string
}

export type { IUpdatesItem, IUpdatesList, INewsItem }