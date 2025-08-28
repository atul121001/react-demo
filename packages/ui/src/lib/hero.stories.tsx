import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero } from './hero';
import { expect } from 'storybook/test';

const meta = {
  component: Hero,
  title: 'UI Library/Hero',
  argTypes: {
    onCtaClick: { action: 'onCtaClick executed!' },
  },
} satisfies Meta<typeof Hero>;
export default meta;

type Story = StoryObj<typeof Hero>;

export const Default = {
  args: {
    title: 'Welcome to our Demo',
    subtitle: 'Build something amazing today',
    cta: 'Get Started',
    onCtaClick: () => alert('Get Started clicked!'),
  },
} satisfies Story;

export const Marketing = {
  args: {
    title: 'Transform Your Business',
    subtitle: 'Join thousands of companies scaling with our platform',
    cta: 'Start Free Trial',
    onCtaClick: () => alert('Trial signup initiated!'),
  },
} satisfies Story;

export const WithConsoleLog = {
  args: {
    title: 'Debug Example',
    subtitle: 'Check browser console when you click the button',
    cta: 'Log to Console',
    onCtaClick: () => console.log('CTA button clicked - check browser console!'),
  },
} satisfies Story;
