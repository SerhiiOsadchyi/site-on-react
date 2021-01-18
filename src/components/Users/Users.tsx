import React, {FC} from 'react';
import s from './Users.module.css';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UserType } from '../../types/types';

type PropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    followInProgressStatus: Array<number>
    onChangePage: (pageNumber: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: FC<PropsType> = (props) => {
    return (
        <div className={s.content}>
            <Paginator currentPage={props.currentPage}
                       totalCount={props.totalCount}
                       pageSize={props.pageSize}
                       onChangePage={props.onChangePage} />
            {props.users.map((user) => <User
                user={user}
                followInProgressStatus={props.followInProgressStatus}
                unfollow={props.unfollow}
                follow={props.follow} /> )}
        </div>
    )
}

export default Users;