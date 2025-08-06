export interface ProfileData {
    createdAt: string
    id: number
    location: string
    name: string
    note: string
    password?: string // Password might be sensitive, making it optional or omitting if not needed on client
    phoneNumber: string
    profile: string // URL for the profile image
    updatedAt: string
}