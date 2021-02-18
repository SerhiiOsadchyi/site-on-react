import React, {Dispatch} from 'react';
import {actions, ActionsType} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {PostType} from "../../../types/common-types";

let mapStateToProps = (state: AppStateType) => {
    return{
        posts: state.profilePage.posts,
    }
};
const mapDispatchToProps = (dispatch: Dispatch<ActionsType>) => {
    return{
        addPost: (post: string) => { dispatch(actions.addNewPost(post)) }
    }
};

const MyPostsContainer = connect<StatePropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

type StatePropsType = {
    posts: Array<PostType>
}

type DispatchPropsType = {
    addPost: (post: string) => void
}