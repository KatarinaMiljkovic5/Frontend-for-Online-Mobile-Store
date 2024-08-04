import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TelefonModel } from 'src/app/models/telefon.model';
import { TelefonService } from 'src/app/services/telefon.service';
import { addTelefon } from 'src/app/store/actions/telefon.actions';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-dodaj-telefon',
  templateUrl: './dodaj-telefon.component.html',
  styleUrls: ['./dodaj-telefon.component.css']
})
export class DodajTelefonComponent implements OnInit {

  dodajTelefonForma: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>, private _telefonService: TelefonService) {

  }

  ngOnInit(): void {
    this.createDodajTelefonForm();
  }


  createDodajTelefonForm() {
    this.dodajTelefonForma = this.fb.group({
      brend: ['', Validators.required],
      model: ['', Validators.required],
      dijagonalaEkrana: ['', Validators.required],
      ram: ['', Validators.required],
      memorija: ['', Validators.required],
      kamera: ['', Validators.required],
      baterija: ['', Validators.required],
      rezolucija: ['', Validators.required],
      cena: ['', Validators.compose([Validators.required, Validators.pattern(/^[1-9]\d*(\.\d+)?$/)])],
      slika: ['', Validators.required],
    })
  }


  dodajTel() {
    const brend = this.dodajTelefonForma.controls['brend'].value;
    const model = this.dodajTelefonForma.controls['model'].value;
    const dijagonalaEkrana = this.dodajTelefonForma.controls['dijagonalaEkrana'].value;
    const ram = this.dodajTelefonForma.controls['ram'].value;
    const memorija = this.dodajTelefonForma.controls['memorija'].value;
    const kamera = this.dodajTelefonForma.controls['kamera'].value;
    const baterija = this.dodajTelefonForma.controls['baterija'].value;
    const rezolucija = this.dodajTelefonForma.controls['rezolucija'].value;
    const cena = Number.parseFloat(this.dodajTelefonForma.controls['cena'].value);
    const slika = this.dodajTelefonForma.controls['slika'].value;

    const telefon = new TelefonModel(brend, model, dijagonalaEkrana, ram, memorija, kamera, baterija, rezolucija, cena, slika);


    this._telefonService.addTelefon(telefon).subscribe(data => {
      alert("Telefon je uspesno dodat");
    }, err => {
      console.log(err.error);
      alert("Doslo je do neke greske");
    })

    this.dodajTelefonForma.reset();
  }

}
