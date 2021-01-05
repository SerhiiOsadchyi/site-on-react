import React from 'react';
import s from './Users.module.css';
import {NavLink} from "react-router-dom";
import userPhoto from '../../assets/image/User-icon.png'

let User = ({user, followInProgressStatus, unfollow, follow}) => {

    return (
        <div key={user.id}>
            <div className={s.avatar}>
                <NavLink to={'/profile/' + user.id}>
                    <div>
                        <img src={user.photos.small ? user.photos.small : userPhoto}/>
                    </div>
                </NavLink>
                <div>{user.followed ?
                    <button disabled={followInProgressStatus.some(id => id === user.id)}
                            onClick={() => {
                                unfollow(user.id)
                            }}>Unfollow</button>
                    : <button disabled={followInProgressStatus.some(id => id === user.id)}
                              onClick={() => {
                                  follow(user.id)
                              }}>Follow</button>
                }
                </div>
            </div>
            <div className={s.info}>
                <div>{user.name}</div>
                <div>{user.status}</div>
                <div>{'user.location.city'}</div>
                <div>{'user.location.country'}</div>
            </div>

        </div>

    )
}

export default User;