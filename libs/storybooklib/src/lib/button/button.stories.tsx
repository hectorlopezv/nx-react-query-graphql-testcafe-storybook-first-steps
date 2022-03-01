import { Story, Meta } from '@storybook/react';
import {Button, ButtonProps} from "@testinghectornx/ui";

export default {
  component: Button,
  title: 'Storybooklib',
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
