import { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import { BytebankFooter } from './index';

const meta = {
    title: 'Components/Footer', // O título aqui deve estar correto
    component: BytebankFooter,
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: () =>
                <>
                    <DocBlock.Title />
                    <DocBlock.Description />

                    <DocBlock.Primary />
                    <DocBlock.Controls />
                </>
        }
    }
} satisfies Meta<typeof BytebankFooter>;

export default meta;

type Story = StoryObj<typeof BytebankFooter>;


export const Desktop: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'desktop',
        }
    }
};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile2',
        }
    }
}
