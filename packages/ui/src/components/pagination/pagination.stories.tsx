import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { BytebankPagination, BytebankPaginationProps } from './pagination';

export default {
  title: 'Components/BytebankPagination',
  component: BytebankPagination,
  argTypes: {
    totalPages: { control: 'number' },
    currentPage: { control: 'number' },
    onPageChange: { action: 'page changed' },
  },
} as Meta<typeof BytebankPagination>;

const Template: StoryFn<typeof BytebankPagination> = (args: BytebankPaginationProps) => (
  <BytebankPagination {...args} />
);

export const Default = Template.bind({});
Default.args = {
  totalPages: 10,
  currentPage: 1,
};
