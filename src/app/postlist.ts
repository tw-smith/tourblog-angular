export interface PostListItem {
    id: number,
    attributes: any,
}

export interface Response {
    data: Array<PostListItem>,
    meta: object,
}