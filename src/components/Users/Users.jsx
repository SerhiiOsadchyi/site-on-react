import React from 'react';
import s from './Users.module.css';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = (props) => {
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