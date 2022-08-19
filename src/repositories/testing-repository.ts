import {bloggers, posts} from "../localDB/localDB";


export const testingRepository = {

    async deleteAll(): Promise<boolean> {
        bloggers.length = 0;
        posts.length = 0;

        return true;
    },
}