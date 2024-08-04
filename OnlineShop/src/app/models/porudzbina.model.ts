import { KorisnikModel } from "./korisnik.model";
import { TelefonModel } from "./telefon.model";

export class PorudzbinaModel {
    telefon?: TelefonModel;
    user?: any;
    adresaDostave: string;
    postanskiBroj: string;
    brojTelefona: string;
    stanje: string;
    id?: number;

    constructor(adresaDostave: string, postanskiBroj: string, brojTelefona: string, stanje:string , korisnik?: any, telefon?: TelefonModel, id?: number){
        this.user = korisnik;
        this.telefon = telefon;
        this.adresaDostave = adresaDostave;
        this.postanskiBroj = postanskiBroj;
        this.brojTelefona = brojTelefona;
        this.stanje = stanje;
        this.id = id;
    }
}
