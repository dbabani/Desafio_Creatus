export class InvalidCredentialsError extends Error{
    constructor(){
        super('Email or/and password are incorrect');
    }
}