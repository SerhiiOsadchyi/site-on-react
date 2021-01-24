import React, {ChangeEvent} from 'react';


///  !!!  This component never use now   !!!  \\\

type PropsType = {
    status: string
    updateUserStatus: (status: string) => void
}
type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        //debugger
        this.setState({
            editMode: false
        });
        this.props.updateUserStatus(this.state.status);
    }
    onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        //debugger
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            //debugger;
            this.setState({
                status: this.props.status
            })
        }

    }

    render() {
        if (this.state.editMode) {
            return (
                <div>
                    <input
                        autoFocus={true}
                        onBlur={this.deactivateEditMode}
                        onChange={this.onChangeStatus}
                        value={this.state.status}/>
                </div>
            )
        }
        return (
            <div>
                <h3 onDoubleClick={this.activateEditMode}> {this.state.status || 'Status info must be here'}</h3>
            </div>
        )

    }

}

export default ProfileStatus;