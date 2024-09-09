import { Meta, StoryFn } from "@storybook/react";
import SearchField from "./SearchField";

export default {
  title: "Components/SearchField",
  component: SearchField,
  argTypes: {
    onSearch: { action: "searched" },
  },
} as Meta<typeof SearchField>;

const Template: StoryFn<typeof SearchField> = (args) => (
  <SearchField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  query: "",
  onSearch: (query: string) => console.log("Search query:", query),
};
