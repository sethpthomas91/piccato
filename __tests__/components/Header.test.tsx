import renderer from 'react-test-renderer';
import Header from '../../components/Header';
import '@testing-library/jest-dom';
import { render, act, fireEvent, screen, waitFor, getByTestId } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import singletonRouter from 'next/router';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe ('Header', () => {

  it('renders correctly', () => {
    const tree = renderer
      .create(<Header/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
  });


  it('pushes to root url', () => {
    render(
      <Header/>
    );
    fireEvent.click(screen.getByTestId('titlePresser'));
    expect(singletonRouter).toMatchObject({ asPath: '/' });
  });

  it('pushes to create url', () => {
    render(
      <Header/>
    );
    fireEvent.click(screen.getByTestId('createPresser'));
    expect(singletonRouter).toMatchObject({ asPath: '/create' });
  });
})
