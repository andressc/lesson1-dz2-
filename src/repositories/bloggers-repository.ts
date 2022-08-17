const bloggers = [
    {id: 1, name: 'IT-INCUBATOR', youtubeUrl: 'https://www.youtube.com/c/ITINCUBATOR'},
    {id: 2, name: 'IT-KAMASUTRA', youtubeUrl: 'https://www.youtube.com/c/ITKAMASUTRA'},
    {id: 3, name: 'Blogger', youtubeUrl: 'https://www.youtube.com/c/ergegerger'},
];

export const bloggersRepository = {
    findAllBloggers() {
        return bloggers;
    },

    findBloggerById(id: number) {
        return bloggers.filter(v => v.id === id);
    },

    isBloggerById(id: number) {
        const blogger = bloggers.find(v => v.id === id);
        if(blogger) {
            return blogger
        }

        return false
    },

    deleteBlogger(id: number) {
        for(let i=0; i< bloggers.length; i++) {
            if(bloggers[i].id === id) {
                bloggers.splice(i, 1);
                return true;
            }
        }

        return false;
    },

    updateBlogger(id: number, name: string, youtubeUrl: string) {
        const blogger = bloggers.find(v => v.id === id);
        if(blogger) {
            blogger.name = name;
            blogger.youtubeUrl = youtubeUrl;
            return true;
        }

        return false;
    },

    createBlogger(name: string, youtubeUrl: string) {
        const newBlogger = {
            id: +(new Date()),
            name,
            youtubeUrl
        };
        bloggers.push(newBlogger);
        return newBlogger.id;
    }
}