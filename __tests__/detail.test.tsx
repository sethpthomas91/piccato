import ImageDetail from "../pages/images/[id]";
import renderer from 'react-test-renderer';

describe ('ImageDetail', () => {
  const mockImageProps = {
      name: "This does not matter",
      url: "some website",
      createdAt: "Some time",
      id: 3
    };

  it('renders correctly', () => {
    const tree = renderer
      .create(<ImageDetail {...mockImageProps}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})