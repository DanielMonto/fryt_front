import React, { useEffect } from 'react'

function BaseInput({
    children,
    inputId,
    labelMessage,
    inputValue,
    labelClasses,
    containerClasses,
    onChangeFunction=(value)=>{},
    onClickFunction=(value)=>{},
    inputPlaceholder='',
    errorMessage='',
    inputClasses='',
    errorClasses='',
    inputType='text'
}) {

    useEffect(() => {
        onChangeFunction(inputValue)
    },[])

    return (
        <div className={containerClasses}>
            <label
                htmlFor={inputId}
                className={labelClasses}
            >
                {labelMessage}
            </label>
            <p className={'nf-error-text '+errorClasses}>
                {errorMessage}
            </p>
            <input
                id={inputId}
                value={inputValue}
                type={inputType}
                onClick={(e) => onClickFunction(e.target.value)}
                onChange={(e) => onChangeFunction(e.target.value)}
                placeholder={inputPlaceholder}
                className={inputClasses}
                autoComplete='off'
            />
            {children}
        </div>
    )
}

export default BaseInput