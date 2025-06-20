import { Meta, StoryFn } from "@storybook/react";
import { Box, Typography } from "@mui/material";
import * as DocBlock from "@storybook/blocks";
import { BytebankCard, BytebankCardProps } from "./card";

const cards: (BytebankCardProps & { name: string })[] = [
  { name: "Titulo do card", variant: "elevation", bgcolor: "lime.900" },
  { name: "Titulo do card", variant: "outlined", bgcolor: "lime.700" },
];
export default {
  title: "Components/Card",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <DocBlock.Description />

          <DocBlock.Primary />
          <DocBlock.Controls />
          <DocBlock.Stories />

          <Box>
            <Typography variant="h5" gutterBottom>
              Variações
            </Typography>
            <Box
              width="100%"
              display="flex"
              flexDirection="column"
              flexWrap="wrap"
              alignItems="flex-start"
              gap={4}
            >
              {cards.map((item, index) => {
                return ( <>
                  <Typography variant="h5" gutterBottom>
                    Exemplo #{index + 1}
                  </Typography>
                  <Box
                    width="50%"
                    key={item.name}
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <BytebankCard
                      variant={item.variant}
                      bgcolor={'lime.700'}
                    >
                      <Box p={2} gap={4} color="#FFF">
                        <Typography
                          variant="h4"
                          color="#FFF"
                          style={{ marginTop: "8px" }}
                        >
                          {item.name}
                        </Typography>

                        <Typography variant="sm" style={{ marginTop: "8px" }}>
                          Lorem ipsum dolor sit amet, consectetur adipisci elit,
                          sed eiusmod tempor incidunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam, quis nostrum
                          exercitationem ullam corporis suscipit laboriosam,
                          nisi ut aliquid ex ea commodi consequatur. Quis aute
                          iure reprehenderit in voluptate velit esse cillum
                          dolore eu fugiat nulla pariatur. Excepteur sint
                          obcaecat cupiditat non proident, sunt in culpa qui
                          officia deserunt mollit anim id est laborum.
                        </Typography>
                      </Box>
                    </BytebankCard>
                  </Box>
                </>);
              })}
            </Box>
          </Box>
        </>
      ),
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["elevation", "outlined"],
    },
    radius: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} as Meta;

const CardTemplate: StoryFn<BytebankCardProps> = ({
  variant,
  radius,
}: BytebankCardProps) => (
  <BytebankCard variant={variant} radius={radius}>
    <Box p={2} gap={4}>
      <Typography variant="h4" style={{ marginTop: "8px" }}>
        Eu sou um card
      </Typography>

      <Typography variant="sm" style={{ marginTop: "8px" }}>
        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
        tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
        nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </Typography>
    </Box>
  </BytebankCard>
);

export const Card = CardTemplate;
