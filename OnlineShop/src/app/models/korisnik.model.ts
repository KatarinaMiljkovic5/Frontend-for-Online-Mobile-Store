export class KorisnikModel {
    ime: string;
    prezime: string;
    email: string;
    username: string;
    password: string;
    roles?: any;
    id?: number;

    constructor(ime: string, prezime: string, email: string, username: string, lozinka: string, roles?: any, id?: number){
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
        this.username = username;
        this.password = lozinka;
        this.roles = roles;
        this.id = id;
    }
}
