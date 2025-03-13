import { PokemonSelect } from "../components/PokemonSelect";
import { Meta, StoryObj } from "@storybook/react";
import logo from "../assets/logo.svg";

const meta: Meta<typeof PokemonSelect> = {
  title: "Components/PokemonSelect",
  component: PokemonSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A custom select component to choose Pokemon with a filterable dropdown.",
      },
    },
  },
  argTypes: {
    value: { control: "object" },
    onChange: { action: "changed" },
    maxSelections: { control: "number" },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <img src={logo} alt="Luna Edge Logo" className="mb-4 w-32 mx-auto" />
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PokemonSelect>;

export const Default: Story = {
  args: {
    value: [],
    maxSelections: 4,
  },
};
