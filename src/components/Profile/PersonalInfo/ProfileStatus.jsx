import React from 'react';

class ProfileStatus extends React.Component {
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
            editMode: false,
        });
        this.props.updateUserStatus(this.state.status);
    }
    onChangeStatus = (e) => {
        //debugger
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps, prevState) {
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
        //debugger;
        return (
            <div>
                <h3 onDoubleClick={this.activateEditMode}> {this.state.status || 'Status info must be here'}</h3>
            </div>
        )

    }

}

export default ProfileStatus;