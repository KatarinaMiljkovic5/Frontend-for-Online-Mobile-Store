import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { KorisnikModel } from 'src/app/models/korisnik.model';
import { PorudzbinaModel } from 'src/app/models/porudzbina.model';
import { TelefonModel } from 'src/app/models/telefon.model';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';
import { StorageService } from 'src/app/services/storage.service';
import { addPorudzbina } from 'src/app/store/actions/porudzbina.actions';
import { getTelefonByIdSelector } from 'src/app/store/selectors/telefon.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-porucivanje',
  templateUrl: './porucivanje.component.html',
  styleUrls: ['./porucivanje.component.css']
})
export class PorucivanjeComponent implements OnInit{

  idTelefona: number;
  telefon: TelefonModel;
  korisnik: KorisnikModel;
  porudzbina: PorudzbinaModel;
  poruciForma: FormGroup;
  poruceno: boolean = false;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>, 
              private fb: FormBuilder,
              private _storageService: StorageService,
              private _porudzService: PorudzbinaService){
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => { this.idTelefona = params['idTelefona'] });

    this.store.select(getTelefonByIdSelector, this.idTelefona).subscribe((data: any) => {
      this.telefon = data;
    })

    this.korisnik = this._storageService.getUser();

    this.createPoruciForm();
  }

  //kreiranje forme pomocu FormBuilder
  createPoruciForm(){
    this.poruciForma = this.fb.group({
      adresaDostave: ['', Validators.compose([Validators.required])],
      postanskiBroj: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      brojTelefona: ['', Validators.compose([Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)])]
    })
  }

  poruci(){
    const adresaDostave = this.poruciForma.get('adresaDostave')?.value;
    const postanskiBroj = this.poruciForma.get('postanskiBroj')?.value;
    const brojTelefona = this.poruciForma.get('brojTelefona')?.value;

    this.porudzbina = new PorudzbinaModel(adresaDostave, postanskiBroj, brojTelefona, 'na cekanju', {"id": this.korisnik.id}, this.telefon);

    // this.store.dispatch(addPorudzbina({ porudzbina: this.porudzbina }));
    this._porudzService.addPorudzbina(this.porudzbina).subscribe(data => {
      this.poruceno = true;
    }, err => {
      console.log(err.error);
      alert("Doslo je do neke greske");
    })
    
    // this.poruceno = true;
  }

}
