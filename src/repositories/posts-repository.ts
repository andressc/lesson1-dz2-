const posts = [
    {
        id: 0,
        title: 'hello',
        shortDescription: 'Short',
        content: 'Long description post',
        bloggerId: 1,
        bloggerName: 'IT-INCUBATOR'
    }
];

export const postsRepository = {
    findAllPosts() {
        return posts;
    },

    findPostById(id: number) {
        return posts.filter(v => v.id === id);
    },

    deletePost(id: number) {
        for(let i=0; i< posts.length; i++) {
            if(posts[i].id === id) {
                posts.splice(i, 1);
                return true;
            }
        }

        return false;
    },

    updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number, bloggerName: string) {
        const post = posts.find(v => v.id === id);
        if(post) {
            post.title = title;
            post.shortDescription = shortDescription;
            post.content = content;
            post.bloggerId = bloggerId;
            post.bloggerName = bloggerName;
            return true;
        }

        return false;
    },

    createPost(title: string, shortDescription: string, content: string, bloggerId: number, bloggerName: string) {

        const newPost = {
            id: +(new Date()),
            title,
            shortDescription,
            content,
            bloggerId,
            bloggerName
        };

        posts.push(newPost);
        return newPost.id;
    }
}