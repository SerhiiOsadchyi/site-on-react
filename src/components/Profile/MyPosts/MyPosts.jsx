import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import AddPostRedux from "./AddPost";

const MyPosts = React.memo((props) => {

    let onAddPost = (value) => {
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