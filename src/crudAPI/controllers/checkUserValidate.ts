import {IUsers} from '../interfaces/interfaces';

export function checkUser(user:IUsers):boolean {
    const id = user.hasOwnProperty("id");
    if(id) {
        return false
    }
    const userName = user.hasOwnProperty("username");
    const ages = user.hasOwnProperty("age");
    const hobbies = user.hasOwnProperty("hobbies") && Array.isArray(user.hobbies);
    return userName && ages && hobbies
}