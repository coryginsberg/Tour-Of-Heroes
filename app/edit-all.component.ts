/**
 * Created by coryginsberg on 4/27/16.
 */

import { Component, Input, OnInit } from 'angular2/core';
import {
    CORE_DIRECTIVES,  FORM_DIRECTIVES, FormBuilder,  ControlGroup,  Validators,  AbstractControl,Control
} from 'angular2/common';
import { Router } from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';


function entryValidator(control: Control): { [s: string]: boolean } {
    var reg = new RegExp(control.value.match(/^[0-9]+$/));
    if (!reg.test(control.value)) {
        return {invalidEntry: true};
    }
}


@Component({
    selector: 'edit-all',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    template:`
    <h1>{{title}}</h1>
    <h2>Edit All Heroes</h2>

    <form [ngFormModel]="myForm" class="ui form">
      <table *ngFor="#hero of heroes">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hero Name</th>
              <th>Price</th>
            </tr>
          </thead>
        <tbody>
          <tr>

            <td id="id"><label>{{hero.id}}</label></td>
            <td id="name"><input [(ngModel)]="hero.name" placeholder="name" /></td>

            <div class="field"
              [class.error]="!entry.valid && entry.touched">
              <input id="entryInput"
                placeholder="myForm"
                [(ngModel)]="hero.price"
                [ngFormControl]="entry"/>
            </div>
          <div *ngIf="!entry.valid" class="ui error message">Input is invalid.</div>
          </tr>
        </tbody>
      </table>
    </form>
  `,
    styleUrls: ['app/app.component.css'],
})
export class EditAllComponent implements OnInit {
    myForm: ControlGroup;
    entry: AbstractControl;
    heroes: Hero[];
    selectedHero: Hero;

    constructor(
        private _heroService: HeroService,
        fb: FormBuilder) {
        this.myForm = fb.group({
            'entry':  ['', Validators.compose([
                Validators.required, entryValidator])]
        });

        this.entry = this.myForm.controls['entry'];
    }

    getHeroes() {
        this._heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    ngOnInit() {
        this.getHeroes();
    }
}