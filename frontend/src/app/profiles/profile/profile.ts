import {
  input,
  signal,
  inject,
  computed,
  Component,
  OnChanges,
  DestroyRef,
  linkedSignal,
} from '@angular/core';
import type { Profile as ProfileT, Slug, Sections as SectionT } from '../profiles.types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SectionEntry } from '../section-entry';
import { ProfileForm } from '../profile-form';
import { MessageService } from 'primeng/api';
import { getResErrMsg } from '../../utils';
import { Accounts } from '../../accounts';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { Profiles } from '../profiles';
import { Section } from '../section';

@Component({
  selector: 'app-profile',
  imports: [ProfileForm, Section, Button, SectionEntry],
  templateUrl: './profile.html',
})
export class Profile implements OnChanges {
  readonly profile = input.required<ProfileT>();

  protected readonly activeProfile = linkedSignal(() => this.profile());

  protected readonly accounts = inject(Accounts);
  protected readonly profiles = inject(Profiles);

  protected readonly editingProfile = signal(false);

  protected readonly editable = computed(() => {
    return this.accounts.user()?.id === this.activeProfile().id;
  });

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _toast = inject(MessageService);
  private readonly _router = inject(Router);

  protected toggleEditingProfile() {
    this.editingProfile.update((editingProfile) => !editingProfile);
  }

  protected handleProfileUpdate(updatedProfile: ProfileT) {
    this.activeProfile.set(updatedProfile);
    this.editingProfile.update((editingProfile) => !editingProfile);
  }

  protected deleteProfile() {
    if (window.confirm('Do you really want to permanently delete your profile?')) {
      this.profiles
        .deleteProfile(this.activeProfile().id)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: () => {
            this._toast.add({
              severity: 'success',
              summary: 'Profile deleted',
              detail: 'Your profile has been deleted successfully.',
            });
            this._router.navigate(['/']);
          },
          error: (res) => {
            this._toast.add({
              severity: 'error',
              summary: 'Profile deletion failed',
              detail: getResErrMsg(res) || 'Failed to delete your profile.',
            });
          },
        });
    }
  }

  protected getSection<S extends Slug>(slug: S): SectionT[S] | null {
    const section = this.profiles.activeProfileSections()[slug];
    return this.editable() || section.loading || section.error || section.entries.length > 0
      ? section
      : null;
  }

  ngOnChanges(): void {
    this.profiles.loadProfileSections(this.activeProfile().id);
  }
}
