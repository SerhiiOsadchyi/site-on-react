import React from 'react';
import styles from "../PersonalInfo/PersonalInfo.module.css" ;
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../common/FormsControl/FormsControl";
import {required} from "../../../utils/validators/validators";

const ProfileDataEditForm = ({handleSubmit, error, ...props}) => {

    const profile = props.profile;
debugger
    return (
        <form onSubmit={handleSubmit} className={styles.profile}>

            {error && <div className={styles.formControlError}><span>{error}</span></div>}

            <div>
                <button type="submit">Save</button>
            </div>
            <div>
                <b>My name: </b><Field name={"fullName"}
                                       component={Input}
                                       type={"text"}
                                       validate={[required]}
                                       placeholder={profile.fullName}/>
            </div>
            <div>
                <b>About me: </b><Field name={"aboutMe"}
                                        component={Textarea}
                                        type={"text"}
                                        placeholder={profile.aboutMe}/>
            </div>
            <div>
                <b>I'm looking for a job: </b><Field name={"lookingForAJob"}
                                                     component={Input}
                                                     type={"checkbox"}/>
            </div>
            <div>
                <b>Description a job that I want: </b><Field name={"lookingForAJobDescription"}
                                                             component={Textarea}
                                                             type={"text"}
                                                             placeholder={profile.lookingForAJobDescription}/>
            </div>
            <div>
                <b>My contacts: </b>
            </div>
            <div>
                {Object.keys(profile.contacts).map((key) => {
                    //debugger
                    return <div key={key}>
                        <b>{key}</b>:  <Field name={`contacts.${key}`}
                               component={Input}
                               type={"text"}
                               placeholder={profile.contacts[key]}/>
                    </div>
                })}
            </div>

        </form>
    )
};

let ProfileDataEditFormRedux = reduxForm({form: 'profileData'})(ProfileDataEditForm);

export default ProfileDataEditFormRedux