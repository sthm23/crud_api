export interface IUsers {
    id?: string
    username: string
    age: number
    hobbies: string[] | []
}

export enum statusCode {
    success = 200,
    createUser = 201,
    deleteUser = 204,
    wrongData = 400,
    notFoundID = 404,
    serverError = 500
}

export const HEADER_CONTENT_TYPE = {'Content-Type': 'application/json'};