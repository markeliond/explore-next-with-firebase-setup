import React from 'react';
import renderer from 'react-test-renderer';

import Date from './date';

test('renders correctly', () => {
    const dateString = '2021-10-21';

    const component = renderer.create(
        <Date dateString={dateString} />
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})