import React from 'react';

import { storiesOf } from '@storybook/react';
import Component1 from '../packages/Component1/Component1'

storiesOf('Test', module)
  .add('Component1', () => (
    <Component1 />
  ))
