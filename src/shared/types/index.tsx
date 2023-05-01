interface IUpdatesItem {
    id: number,
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

export type { IUpdatesItem, IUpdatesList }