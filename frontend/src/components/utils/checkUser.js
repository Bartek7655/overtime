export const loged = () => {
    if(localStorage.getItem("access_token")){
        return true
    }
    return false
}

