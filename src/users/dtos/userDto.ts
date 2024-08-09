export interface User {
    fullName: string;
    email: string;
    password: string;
    password: string;
    
}

export interface UserUpdate extends User {
    id: string;

}