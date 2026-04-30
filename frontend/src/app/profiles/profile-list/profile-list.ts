import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Profiles } from '../profiles';
import { List } from '../../list';

@Component({
  selector: 'app-profile-list',
  imports: [List, RouterLink],
  templateUrl: './profile-list.html',
})
export class ProfileList implements OnInit {
  protected readonly profiles = inject(Profiles);

  ngOnInit() {
    this.profiles.reset();
    this.profiles.load();
  }
}
