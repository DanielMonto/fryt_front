import React from 'react'

function BaseInput({
    children,
    inputId,
    labelMessage,
    onChangeFunction=(value)=>{},
    onClickFunction=(value)=>{},
    inputValue,
    containerClasses='nf-email',
    inputPlaceholder='',
    errorMessage='',
    labelClasses='nf-text',
    inputClasses='',
    errorClasses='nf-error-text',
    inputType='text'
}) {

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