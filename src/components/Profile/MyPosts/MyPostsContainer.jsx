import React from 'react';
import {actions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return{
        posts: state.profilePage.posts,
        textNewPost: state.profilePage.textNewPost,
    }
};
let mapDispatchToProps = (dispatch) => {
    return{
        addPost: (post) => {
            dispatch(actions.addNewPostCreator(post));
        }
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;