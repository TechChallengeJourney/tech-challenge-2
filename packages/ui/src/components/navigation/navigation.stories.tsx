import { Meta, StoryFn } from "@storybook/react";
import { BytebankNavigation, BytebankNavigationProps } from "./navigation";

export default {
  title: "Components/BytebankNavigation",
  component: BytebankNavigation,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    onPrev: { action: "clicked previous" },
    onNext: { action: "clicked next" },
  },
} as Meta;

const Template: StoryFn<BytebankNavigationProps> = (args) => <BytebankNavigation {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: "medium",
};