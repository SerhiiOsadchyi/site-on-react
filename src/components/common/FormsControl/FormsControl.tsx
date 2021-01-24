import React from 'react';
import styles from './FormsControl.module.css'
import {WrappedFieldProps} from "redux-form";

export const FormControl: React.FC<WrappedFieldProps> = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;
    return (
        <div className={ styles.formControl + ' ' + (hasError?  styles.error : '') }>
                {props.children}
            <div>
                {hasError && <span>{error}</span>}
            </div>
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
//    const {input, meta, child, ...restProps} = props
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}> <textarea {...input} {...restProps}  /> </FormControl>
    )
}
export const Input: React.FC<WrappedFieldProps> = (props) => {
//    const {input, meta, child, ...restProps} = props
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}> <input {...input} {...restProps}  /> </FormControl>
    )
}

