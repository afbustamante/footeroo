import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../match';
import { MatchesService } from '../matches.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {

  match$: Observable<Match | Object>;

  constructor(
    private matchesService: MatchesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.match$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.matchesService.loadMatch(params.get('code')))
    );
  }

}
