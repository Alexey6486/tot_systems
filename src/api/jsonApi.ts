import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/'
})

export type MessageType = {
    id: string,
    message: string,
    author: string,
}
export type AuthDataType = {
    email: string
    password: string
}

export const jsonApi = {
    getGeneralMessages() {
        return instance
            .get<Array<MessageType>>(`generalChat`)
            .then((res) => {
                return res.data
            });
    },
    addGeneralMessage(message: string, author: string) {
        return instance
            .post(`generalChat`, {
                message,
                author
            })
            .then((res) => {
                return res.data
            });
    },
    editGeneralMessage(id: string, message: string, author: string) {
        return instance
            .put(`generalChat/${id}`, {
                message,
                author
            })
            .then((res) => {
                return res.data
            });
    },
    deleteGeneralMessage(id: string) {
        return instance
            .delete(`generalChat/${id}`)
            .then((res) => {
                return res.data
            });
    },
    login() {
        return instance
            .get<AuthDataType>(`auth`)
            .then((res) => {
                return res.data
            })
    },
    getBusinessMessages() {
        return instance
            .get<Array<MessageType>>(`businessChat`)
            .then((res) => {
                return res.data
            });
    },
    addBusinessMessage(message: string, author: string) {
        return instance
            .post(`businessChat`, {
                message,
                author
            })
            .then((res) => {
                return res.data
            });
    },
    editBusinessMessage(id: string, message: string, author: string) {
        return instance
            .put(`businessChat/${id}`, {
                message,
                author
            })
            .then((res) => {
                return res.data
            });
    },
    deleteBusinessMessage(id: string) {
        return instance
            .delete(`businessChat/${id}`)
            .then((res) => {
                return res.data
            });
    },
}