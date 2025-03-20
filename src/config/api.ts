import axios from 'axios'

export const charactersApiInstance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
})