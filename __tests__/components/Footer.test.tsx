import renderer from 'react-test-renderer';
import Footer from '../../components/Footer';
import '@testing-library/jest-dom'

describe ('Footer', () => {

    it('renders correctly', () => {
      const tree = renderer
        .create(<Footer />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
})