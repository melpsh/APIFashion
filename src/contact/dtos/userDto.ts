export interface User {
    name: string;
    email: string;
    message: string;
    subject: string;
    
}

export interface UserUpdate extends User {
    id: string;

}