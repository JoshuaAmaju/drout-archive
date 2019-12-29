import React from 'react'
import classNames from "classnames";
import {css, StyleSheet, CSSProperties} from 'aphrodite'

type TextInputProps = {
    type?: string;
    onChange?: any;
    value?: string;
    className?: string;
    placeholder?: string
    style?: CSSProperties;
}

const TextInput: React.FC<TextInputProps> = props => {
    let {type = 'text', style, value, className, placeholder, onChange} = props;
    let textInputStyle = StyleSheet.create({style: {...style}});
    return <input type={type} value={value} placeholder={placeholder} onChange={onChange} className={classNames(css(textInputStyle.style), className)} />
}

export default TextInput;