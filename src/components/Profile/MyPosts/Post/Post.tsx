import React, {FC} from 'react';
import s from './Post.module.css';
import {PostType} from "../../../../types/common-types";

const Post: FC<PropsType> = (props) => {
    return (
        <div className={s.item}>
            <img src='https://static1.funidelia.com/5150-f4_large/seksualnij-kostum-dla-doroslih-nejtiri-z-avatara.jpg' />
            { props.message }
        </div>
    )

};

export default Post;

type PropsType = {
    message: string
}
