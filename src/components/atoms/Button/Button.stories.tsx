import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Button from "./Button";
import { FaArrowLeft } from "react-icons/fa";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    onClick: { action: "clicked" },
    icon: { table: { disable: true } },
  },
} as Meta<typeof Button>;

// eslint-disable-next-line react/function-component-definition, react/jsx-props-no-spreading
const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "Click Me",
  icon: null,
  disabled: false,
  className: "",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  text: "Search",
  icon: <FaArrowLeft />,
  disabled: false,
  className: "",
};

export const Disabled = Template.bind({});
Disabled.args = {
  text: "Disabled Button",
  icon: <FaArrowLeft />,
  disabled: true,
  className: "",
};
