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
    notFoundID = 400,
    wrongData = 404,
    serverError = 500
}

export enum textMessage {
    wrongPath = "You wrote bad path request",
    wrongProp = "Written wrong properties",
    wrongIdFormat = "ID was not in format UUID",
    userNotFound = "User Not Found",
    userDeleted = "User has been deleted",
    notAllProp = "All required properties not written",
    serverError =  "Something was happened in server"
}

export const HEADER_CONTENT_TYPE = {'Content-Type': 'application/json'};