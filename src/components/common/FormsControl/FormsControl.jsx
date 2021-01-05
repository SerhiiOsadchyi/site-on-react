import React from 'react';
import styles from './FormsControl.module.css'

export const FormControl = ({input, meta: {touched, error}, child, ...props}) => {
    //debugger
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

export const Textarea = (props) => {
    //debugger
    const {input, meta, child, ...restProps} = props
    return (
        <FormControl {...props}> <textarea {...input} {...restProps}  /> </FormControl>
    )
}
export const Input = (props) => {
    //debugger
    const {input, meta, child, ...restProps} = props
    return (
        <FormControl {...props}> <input {...input} {...restProps}  /> </FormControl>
    )
}

