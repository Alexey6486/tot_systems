import React from "react";
import s from './formFields.module.css'

const FormField = (Element: string) => ({input, meta, ...props}: any) => {

    const error = meta.touched && meta.error;

    return (
        <div className={s.formFieldWrap}>
            <Element {...input} {...props}/>
            {error && <div className={s.formFieldError}>{meta.error}</div>}
        </div>
    )
};

export const Textarea = FormField('textarea');
export const Input = FormField('input');