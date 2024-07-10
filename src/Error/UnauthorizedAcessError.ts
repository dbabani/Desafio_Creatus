export class UnauthorizedAcessError extends Error{
    constructor(){
        super('Unauthorized Access');
    }
}