import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PorudzbinaModel } from 'src/app/models/porudzbina.model';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';
import { deletePorudzbina, getPorudzbine, updatePorudzbina } from 'src/app/store/actions/porudzbina.actions';
import { getPorudzbineSelector } from 'src/app/store/selectors/porudzbina.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-pregled-porudzbina',
  templateUrl: './pregled-porudzbina.component.html',
  styleUrls: ['./pregled-porudzbina.component.css']
})
export class PregledPorudzbinaComponent {

  porudzbine: PorudzbinaModel[];

  constructor(private store: Store<AppState>, private _porudzbinaService: PorudzbinaService) {

    this.store.select(getPorudzbineSelector).subscribe((porudzbine) => {
      this.porudzbine = porudzbine;
    });

    this.store.dispatch(getPorudzbine());
  }


  obrisiPorudzbinu(id: any) {

    this._porudzbinaService.deletePorudzbina(id).subscribe(data => {
      alert("Uspesno obrisana porudzbina");
      this.store.dispatch(getPorudzbine());
    }, err => {
      console.log(err.error);
      alert("Doslo je do neke greske");
    })
  }

  azurirajPorudzbinu(porudzbina: PorudzbinaModel) {
    const updatedPorudzbina: PorudzbinaModel = new PorudzbinaModel(porudzbina.adresaDostave, porudzbina.postanskiBroj, porudzbina.brojTelefona, 'isporuceno', porudzbina.user, porudzbina.telefon, porudzbina.id);
    this.store.dispatch(updatePorudzbina({ porudzbina: updatedPorudzbina }));
    this.store.dispatch(getPorudzbine());
  }

}
