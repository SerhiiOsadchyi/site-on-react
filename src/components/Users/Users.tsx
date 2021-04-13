import React, {FC, useEffect} from 'react';
import s from './Users.module.css';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {useDispatch, useSelector} from "react-redux";
import {
    getFollowInProgressStatus,
    getPageSize,
    getThisPage,
    getTotalCount,
    getUsersSelector
} from "../../redux/users-selector";
import {follow, getUsers, onClickCurrentPage, unfollow} from "../../redux/users-reducer";

/*type PropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    followInProgressStatus: Array<number>
    onChangePage: (pageNumber: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}*/

export const Users: FC = (props) => {

    const currentPage = useSelector(getThisPage);
    const totalCount = useSelector(getTotalCount);
    const pageSize = useSelector(getPageSize);
    const users = useSelector(getUsersSelector);
    const followInProgressStatus = useSelector(getFollowInProgressStatus);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize))
    },[]);

    const onChangePage = (pageNumber: number) => {
        dispatch(onClickCurrentPage(pageNumber));
        dispatch(getUsers(pageNumber, pageSize))
    };

    const followUser = (userId: number) => {
        dispatch(follow (userId))
    };
    const unfollowUser = (userId: number) => {
        dispatch(unfollow (userId))
    };

    return (
        <div className={s.content}>
            <Paginator currentPage={currentPage}
                       totalCount={totalCount}
                       pageSize={pageSize}
                       onChangePage={onChangePage}
            />
            {users.map((user) => <User
                user={user}
                followInProgressStatus={followInProgressStatus}
                unfollow={unfollowUser}
                follow={followUser}/>)}
        </div>
    )
}

export default Users;