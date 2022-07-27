import renderer from 'react-test-renderer';
import GalleryImage, { GalleryImageProps } from '../../components/GalleryImage';
import { render, fireEvent, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe ('GalleryImage', () => {
  const mockImageProps: GalleryImageProps = {
    id: 1,
    createdAt: "Does not matter",
    name: "Does not matter",
    url: "Does not matter",
  }

  it('renders correctly', () => {
    const tree = renderer
      .create(<GalleryImage image={mockImageProps}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
  });
  
  mockRouter.useParser(createDynamicRouteParser([
    "/api",
    "/images",
    "/images/[id]",
    "/create",
    '/'
  ]));
  
  it('pushes to /images/[id]', () => {
    render(
      <GalleryImage image={mockImageProps}/>
    );
    fireEvent.click(screen.getByTestId('imagePresser'));
    expect(mockRouter).toMatchObject({ 
      pathname: "/images/[id]"
    });
  });
})
