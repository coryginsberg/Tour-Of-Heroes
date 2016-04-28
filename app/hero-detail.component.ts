import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import {
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    FormBuilder
} from 'angular2/common';

@Component({
  selector: 'my-hero-detail',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  templateUrl: 'app/hero-detail.component.html',
  styleUrls: ['app/hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  @Input() price: Hero;

  constructor(
    private _heroService: HeroService,
    private _routeParams: RouteParams,
    private fb: FormBuilder) {
    }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._heroService.getHero(id)
      .then(hero => this.hero = hero);
  }

  static goBack() {
    window.history.back();
  }
}
