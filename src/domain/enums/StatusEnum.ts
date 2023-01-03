export const PostStatus: {
    Draft: 'Draft'
    Published: 'Published'
    Archived: 'Archived'
} = {
    Draft: 'Draft',
    Published: 'Published',
    Archived: 'Archived'
}

export type PostStatus = typeof PostStatus[keyof typeof PostStatus]