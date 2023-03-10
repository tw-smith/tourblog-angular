
export interface PostIndexItem {
    id: number,
    title: string,
    publishedAt: string,
    displayDate: string,
    slug: string,
    tag: string,
    coverPhoto: string,
}

export interface SplashURL {
    splashURL : string,
}

export interface Post {
    id: number,
    title: string,
    subtitle: string,
    content: string,
    publishedAt: string,
    photos: Array<Photo>
}

export interface Photo {
    caption: string,
    id: number,
    url: any,
    formats: {
        small: {
            url: string
        },
        large: {
            url: string
        },
        xlarge: {
            url: string
        },
    },
}

interface CoverPhoto {
    data: any
}






