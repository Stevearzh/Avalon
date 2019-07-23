import { shallow } from 'enzyme';
import * as React from 'react';

import NavBar from './NavBar';

it('matches snapshot', () => {
  expect(shallow(<NavBar theme="dark" onThemeChange={jest.fn()} />)).toMatchSnapshot();
});
