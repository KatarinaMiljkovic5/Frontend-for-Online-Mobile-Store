import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TelefonModel } from 'src/app/models/telefon.model';
import { StorageService } from 'src/app/services/storage.service';
import { getTelefonByIdSelector } from 'src/app/store/selectors/telefon.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-telefon-card',
  templateUrl: './telefon-card.component.html',
  styleUrls: ['./telefon-card.component.css']
})
export class TelefonCardComponent implements OnInit {

  id: number;
  telefon: TelefonModel;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              public _storageService: StorageService){}
            
  ngOnInit(): void {
    this.route.params.subscribe((params) => {this.id = params['id']});
    this.store.select(getTelefonByIdSelector, this.id).subscribe((data: any) => {
      this.telefon = data;
    })
  }



}
