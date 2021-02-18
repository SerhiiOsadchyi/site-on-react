import React, {useState, useEffect, FC, ChangeEvent} from 'react';

let ProfileStatusUseEffect: FC<ProfileStatusUseEffectType> = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus (e.currentTarget.value);
    }
    useEffect ( () => {
        setStatus(props.status)
    },[props.status]);

    if (editMode) {
        return (
            <div>
                <input
                    autoFocus={true}
                    onBlur={deactivateEditMode}
                    onChange={onChangeStatus}
                    value={status}/>
            </div>
        )
    }

    return (
        <div>
            <h3 onDoubleClick={activateEditMode}> {status || 'Status info must be here'}</h3>
        </div>
    )

}

export default ProfileStatusUseEffect;

type ProfileStatusUseEffectType = {
    status: string,
    updateUserStatus: (status: string) => void
}