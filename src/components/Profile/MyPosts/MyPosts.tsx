import React, {FC} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import AddPostRedux from "./AddPost";
import {PostType} from "../../../types/common-types";

const MyPosts: FC<PropsType> = React.memo((props) => {

    let onAddPost = (value: AddPostValuesType) => {
        props.addPost(value.post);
    };

    let posts = props.posts.map((post) => {
        return <Post message={post.message} key={post.id}/>
    })

    return (
        <div>
            <h3>My posts</h3>
            <AddPostRedux onSubmit={onAddPost} />
            {posts}
        </div>
    )

});

export default MyPosts;

export type AddPostValuesType = {
    post: string
}

type StatePropsType = {
    posts: Array<PostType>
}
type DispatchPropsType = {
    addPost: (post: string) => void
}

type PropsType = StatePropsType & DispatchPropsType