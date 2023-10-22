import Organisation from "@/app/organisation-components/organisation";
import Home from "../app/page";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import organisationData from '../../public/data/organisation.json'
//

describe('Home Component', () => {
  it('should render the component', () => {
    render(<Home />);

    const searchInput = screen.getByLabelText('Search');
    expect(searchInput).toBeInTheDocument();
  });


  describe('Organisation Component', () => {

    it('should render the component', () => {
      render(<Organisation repo={organisationData} />);
      const searchInput = screen.getByLabelText('Search for person');
      expect(searchInput).toBeInTheDocument();
    });

    it('should handle search ', () => {
      render(<Organisation repo={organisationData} />);
      const searchInput = screen.getByLabelText('Search for person');
      const searchButton = screen.getByText('Search');

      fireEvent.change(searchInput, { target: { value: 'John' } });

      fireEvent.click(searchButton);

    });
    it('should expand more Boxes with each click of KeyboardArrowDownIcon', () => {
      render(<Organisation repo={organisationData } />);
      
      const downIcons = screen.getAllByTestId('keyboard-arrow-down');
      
      downIcons.forEach((downIcon) => {
        fireEvent.click(downIcon);
      });
      
      const additionalBoxes = screen.getAllByTestId('boxes');
      
      // expect the number of additional boxes to be more than  the number of downIcons
      expect(additionalBoxes.length).toBeGreaterThan(downIcons.length);
    });
    });



});

