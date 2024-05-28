import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import TabsContainer, { TabNodeI } from '..';

describe('TabsContainer', () => {
  const tabs: TabNodeI[] = [
    { name: 'Tab1', component: <div>Content 1</div> },
    { name: 'Tab2', component: <div>Content 2</div> }
  ];

  const setup = (value: number = 0) => {
    const handleChange = jest.fn();
    render(
      <TabsContainer
        tabs={tabs}
        tabsContainerName='My Tabs'
        value={value}
        handleChange={handleChange}
      />
    );
    return handleChange;
  };

  test('renders all tabs and their content', () => {
    setup();
    tabs.forEach((tab) => {
      expect(screen.getByText(tab.name)).toBeInTheDocument();
      if (tab.name === 'Tab1') {
        expect(screen.getByText('Content 1')).toBeVisible();
      } else {
        expect(screen.queryByText('Content 2')).toBeNull();
      }
    });
  });

//   test('switches tabs correctly', () => {
//     const handleChange = setup();
//     const secondTab = screen.getByText('Tab2');
//     fireEvent.click(secondTab);
//     expect(handleChange).toHaveBeenCalledWith(expect.anything(), 1);
//     setup(1);
//     expect(screen.getByText('Content 2')).toBeVisible();
//     expect(screen.queryByText('Content 1')).toBeNull();
//   });

//   test('sets accessibility attributes correctly', () => {
//     setup();
//     tabs.forEach((tab, index) => {
//       expect(screen.getByRole('tab', { name: tab.name })).toHaveAttribute(
//         'id',
//         `simple-tab-${index}`
//       );
//       expect(screen.getByRole('tabpanel')).toHaveAttribute(
//         'aria-labelledby',
//         `simple-tab-${index}`
//       );
//     });
//   });
});
