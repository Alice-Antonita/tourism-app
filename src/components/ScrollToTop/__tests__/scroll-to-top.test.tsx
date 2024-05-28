import '@mui/material/useScrollTrigger';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ScrollTop } from '..';

jest.mock('@mui/material/useScrollTrigger');

describe('ScrollTop', () => {
  const mockUseScrollTrigger = require('@mui/material/useScrollTrigger').default;

  const setup = (triggerValue: boolean) => {
    const windowMock = () => ({
      document: {
        querySelector: jest.fn().mockReturnValue({
          scrollIntoView: jest.fn()
        })
      }
    });

    mockUseScrollTrigger.mockImplementation(() => triggerValue);

    const element = <div>Up</div>;

    render(<ScrollTop window={windowMock as unknown as () => Window}>{element}</ScrollTop>);

    return {
      windowMock: windowMock().document,
      element
    };
  };

  test('component is visible when scrolled past threshold', () => {
    setup(true);
    expect(screen.getByText('Up')).toBeVisible();
  });

  test('component is not visible when not scrolled past threshold', () => {
    setup(false);
    expect(screen.getByText('Up')).not.toBeVisible();
  });

//   test('clicking the component scrolls to the anchor', () => {
//     const { windowMock } = setup(true);
//     fireEvent.click(screen.getByText('Up'));
//     expect(windowMock.querySelector).toHaveBeenCalledWith('#back-to-top-anchor');
//     expect(windowMock.querySelector().scrollIntoView).toHaveBeenCalledWith({ block: 'center' });
//   });
});
