import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src='https://static1.funidelia.com/5150-f4_large/seksualnij-kostum-dla-doroslih-nejtiri-z-avatara.jpg' />
            { props.message }
        </div>
    )

};

export default Post;