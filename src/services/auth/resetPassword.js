export const resetPassword = async (old_password, new_password, new_password_confirmation, fetchJWT) => {
    const response = await fetchJWT(
        '/auth/reset_password/',
        {
            old_password,
            new_password,
            new_password_confirmation
        },
        'POST'
    )
    if (!response.ok){
        const data = await response.json()
        if (data.message===undefined || data.field===undefined){
            throw Error('Unknown error happened')
        }
        return [false, data.message, data.field]
    }
    return [true, 'Password reset', 'new_password']
}