import {PostsType} from "../types/postsType";
import {BloggersType} from "../types/bloggersType";

export const posts: PostsType[] = [
    {
        id: 0,
        title: 'hello',
        shortDescription: 'Short',
        content: 'Long description post',
        bloggerId: 1,
        bloggerName: 'IT-INCUBATOR'
    }
];

export const bloggers: BloggersType[] = [
    {id: 1, name: 'IT-INCUBATOR', youtubeUrl: 'https://www.youtube.com/c/ITINCUBATOR'},
    {id: 2, name: 'IT-KAMASUTRA', youtubeUrl: 'https://www.youtube.com/c/ITKAMASUTRA'},
    {id: 3, name: 'Blogger', youtubeUrl: 'https://www.youtube.com/c/ergegerger'},
];