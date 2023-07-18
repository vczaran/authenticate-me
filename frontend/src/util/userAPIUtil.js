import { csrfFetch } from "../store/csrf";


export const postUser = (user) => {
    return csrfFetch(`/api/users`, {
        method: 'POST',
        body: JSON.stringify(user)
    })
}