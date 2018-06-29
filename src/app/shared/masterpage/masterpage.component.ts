import { Component, OnInit } from '@angular/core';
import { MediaService } from '@angular/flex-layout';
import { Observable, of } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-masterpage',
  templateUrl: './masterpage.component.html',
  styleUrls: ['./masterpage.component.css']
})
export class MasterpageComponent implements OnInit {

  sidenavMode$: Observable<string> = of('over');
  sidenavOpen$: Observable<boolean> = of(false);

  constructor(
    private mediaService: MediaService
  ) { }

  ngOnInit() {
    const mqAlias$: Observable<string> = this.mediaService.asObservable().pipe(
      map(media => media.mqAlias),
      distinctUntilChanged()
    );
    this.sidenavMode$ = mqAlias$.pipe(
      map(mqAlias => (mqAlias === 'xs' || mqAlias === 'sm') ? 'over' : 'side')
    );
    this.sidenavOpen$ = mqAlias$.pipe(
      map(mqAlias => (mqAlias === 'xs' || mqAlias === 'sm') ? false : true)
    );
  }

}
