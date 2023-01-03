export const UserRole: {
    Admin: 'Admin'
    Editor: 'Editor'
    Author: 'Author'
} = {
    Admin: 'Admin',
    Editor: 'Editor',
    Author: 'Author'
}

export type UserRole = typeof UserRole[keyof typeof UserRole]