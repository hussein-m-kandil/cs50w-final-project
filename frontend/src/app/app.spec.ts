import { render, RenderComponentOptions, screen } from '@testing-library/angular';
import { environment } from '../environments';
import { App } from './app';

const renderComponent = (options: RenderComponentOptions<App> = {}) => {
  return render(App, options);
};

describe('App', () => {
  it('should display the app title', async () => {
    await renderComponent();
    const name = environment.title;
    expect(screen.getByRole('heading', { name })).toBeVisible();
  });
});
