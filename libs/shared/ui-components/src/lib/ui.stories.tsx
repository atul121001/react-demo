import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ui } from './ui';

const meta = {
  component: Ui,
  title: 'UI Library/Ui',
} satisfies Meta<typeof Ui>;

export default meta;

type Story = StoryObj<typeof Ui>;

export const Default: Story = {
  args: {},
};
