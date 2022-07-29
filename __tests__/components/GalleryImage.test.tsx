import renderer from 'react-test-renderer';
import GalleryImage, { GalleryImageProps } from '../../components/GalleryImage';
import { render, fireEvent, screen, renderHook, act } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe ('GalleryImage', () => {
  const mockImageProps: GalleryImageProps = {
    mint_date: "date string",
    uri: "uri string",
    metadata_id: "uri",
  }

  it('renders correctly', () => {
    const tree = renderer
      .create(<GalleryImage props={mockImageProps}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  function setupFetchStub(data) {
    return function fetchStub(_url) {
      return new Promise((resolve) => {
        resolve({
          json: () =>
            Promise.resolve({
              data,
            }),
        })
      })
    }
  }

  it('renders a div when useEffect returns a mock image', () => {
    const fakeData = {
      image: "www.testImageLocation.com"
    }
    global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData))
    render(<GalleryImage props={mockImageProps}/>);
    const imagePresser = screen.getByTestId('imagePresser')
    expect(imagePresser).toBeDefined();
  });

  it('pushes to /images/[id]', () => {
    mockRouter.setCurrentUrl("/");
    mockRouter.useParser(createDynamicRouteParser([
      "/images",
      "/images/[id]",
      "/create",
      '/'
    ]));
    const fakeData = {
      image: "www.testImageLocation.com"
    }
    global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData))
    
    render(<GalleryImage props={mockImageProps}/>);
    
    act(() => {
      const imagePresser = screen.getByTestId('imagePresser')
      fireEvent.click(imagePresser)});
      expect(mockRouter).toMatchObject({ 
        pathname: "/images/[id]"
      });
    });
})
