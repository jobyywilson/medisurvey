
export type Role = "USER" | "ADMIN";
export class User {

    constructor(
        public username: string,
        public password: string,
        public firstName: string,
        public lastName: string,
        public role: Role,
        public authdata?: string,
    ){

    }

}