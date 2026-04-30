import { render, RenderComponentOptions, screen } from '@testing-library/angular';
import { ProfileList } from './profile-list';
import { Profiles } from '../profiles';

const profilesMock = {
  list: vi.fn(() => [] as unknown[]),
  load: vi.fn(),
  reset: vi.fn(),
  loading: vi.fn(),
  hasMore: vi.fn(),
  loadError: vi.fn(),
};

const renderComponent = ({ providers, ...options }: RenderComponentOptions<ProfileList> = {}) => {
  return render(ProfileList, {
    providers: [{ provide: Profiles, useValue: profilesMock }, ...(providers || [])],
    autoDetectChanges: false,
    ...options,
  });
};

describe('ProfileList', () => {
  it('should reset and load profiles on init', async () => {
    await renderComponent();
    expect(profilesMock.reset).toHaveBeenCalledTimes(1);
    expect(profilesMock.load).toHaveBeenCalledTimes(1);
  });

  it('should render no-profiles message', async () => {
    profilesMock.list.mockImplementation(() => []);
    await renderComponent();
    expect(screen.getByText(/there are no profiles/i)).toBeVisible();
    expect(screen.queryByRole('listitem')).toBeNull();
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('should render the profiles', async () => {
    profilesMock.list.mockImplementation(() => [
      { id: 1, name: 'Foo Bar' },
      { id: 2, name: 'Tar Wax' },
    ]);
    await renderComponent();
    const lists = screen.getAllByRole('list');
    const listitems = screen.getAllByRole('listitem');
    expect(lists).toHaveLength(1);
    expect(listitems).toHaveLength(2);
    for (const list of lists) expect(list).toBeVisible();
    for (const listitem of listitems) expect(listitem).toBeVisible();
  });
});
