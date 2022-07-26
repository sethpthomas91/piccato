import '@testing-library/jest-dom';
import { generateImageArr } from '../pages/index';
import Home from '../pages/index';
import renderer from 'react-test-renderer';

describe ('generateImageArr', () => {
  const mockImageData = {
    data: [
      {
        name: "This does not matter",
        url: "some website",
        createdAt: "Some time",
        id: 1
      },
      {
        name: "This does not matter",
        url: "some website",
        createdAt: "Some time",
        id: 2
      },
      {
        name: "This does not matter",
        url: "some website",
        createdAt: "Some time",
        id: 3
      }
    ]
  };

  it('returns an array of 3 images', () => {
    const imageArr = generateImageArr(mockImageData);
    expect(imageArr).toHaveLength(3)
  });
})

describe ('Home', () => {
  const mockImageData = {
    data: [
      {
        name: "This does not matter",
        url: "some website",
        createdAt: "Some time",
        id: 1
      },
      {
        name: "This does not matter",
        url: "some website",
        createdAt: "Some time",
        id: 2
      },
      {
        name: "This does not matter",
        url: "some website",
        createdAt: "Some time",
        id: 3
      }
    ]
  };

  it('renders correctly', () => {
    const tree = renderer
      .create(<Home data={mockImageData.data}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})
