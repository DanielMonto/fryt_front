import { useState, useCallback } from "react"

function useInputChange(checkFunction) {
    const [[field, fieldError], setField] = useState(['', ''])

    const handleFieldChange = useCallback((value) => {
        if (value.length === 0) {
            setField([value, 'Field is required'])
        } else {
            const [exit, message] = checkFunction(value)
            if (exit) {
                setField([value, ''])
            } else {
                setField([value, message])
            }
        }
    }, [checkFunction])

    return [
        [field, fieldError],
        handleFieldChange,
        setField,
    ]
}

export default useInputChange
