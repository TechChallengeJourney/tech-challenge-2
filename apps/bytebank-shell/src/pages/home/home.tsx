import { ReactElement, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { BytebankCard } from "@repo/ui";
import {
  CardGiftcardOutlined,
  AssuredWorkload,
  StarBorderOutlined,
  DevicesOtherOutlined,
} from "@mui/icons-material";
import { useTheme } from "@repo/utils";
import { useUser } from "@repo/data-access";

type Benefit = {
  icon: ReactElement;
  title: string;
  description: string;
};

const BENEFITS: Benefit[] = [
  {
    icon: <CardGiftcardOutlined sx={{ fontSize: 80 }} />,
    title: "Conta e cartão gratuitos",
    description:
      "Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.",
  },
  {
    icon: <AssuredWorkload sx={{ fontSize: 80 }} />,
    title: "Saques sem custo",
    description:
      "Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.",
  },
  {
    icon: <StarBorderOutlined sx={{ fontSize: 80 }} />,
    title: "Programa de pontos",
    description:
      "Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!",
  },
  {
    icon: <DevicesOtherOutlined sx={{ fontSize: 80 }} />,
    title: "Seguro Dispositivos",
    description:
      "Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.",
  },
];

const BytebankHomePage = () => {
  const { isDarkMode, colors } = useTheme();

  useEffect(() => {
    const header = document.getElementById("bytebank-header");

    if (!header) return;

    const headerOriginal = header.style.cssText;

    const setHeaderStyle = () => {
      if (!isDarkMode) {
        if (window.scrollY > 50) {
          header.style.background = "rgb(255 255 255 / 85%)";
        } else {
          header.style.background = "transparent";
        }
      } else {
        if (window.scrollY > 50) {
          header.style.background = "rgb(16 18 9 / 70%)";
        } else {
          header.style.background = "transparent";
        }
      }
    };

    setHeaderStyle();
    window.addEventListener("scroll", setHeaderStyle);
    return () => {
      header.style.cssText = headerOriginal;
      window.removeEventListener("scroll", setHeaderStyle);
    };
  }, [isDarkMode]);

  useEffect(() => {
    const footer = document.getElementById("bytebank-bg-footer");
    const footerText = document.getElementById('bytebank-footer-text');
    if (!footer || !footerText) return;

    const bodyOriginal = document.body.style.cssText;
    const footerOriginal = footer.style.cssText;
    const footerTextOriginal = footerText.style.cssText;

    if (!isDarkMode) {
      footer.style.backgroundColor = colors["lime.dark"];
      footerText.style.color = colors["lime.100"];
      document.body.style.background =
        "radial-gradient(100% 244.46% at 0% 0%, rgb(212 214 110) 0%, rgb(243, 245, 196) 100%) 0% 0% / 120% 120%, radial-gradient(50% 122.23% at 50% 50%, rgb(113 124 38) 0%, rgb(48, 108, 0) 100%), radial-gradient(100.45% 245.58% at 0% 0%, rgb(125 239 13) 0%, rgb(126, 177, 86) 100%), linear-gradient(127.43deg, rgb(99, 0, 0) 0%, rgb(137 118 212) 100%)";
      document.body.style.backgroundBlendMode =
        "lighten, color-burn, color-dodge, difference, normal";
      document.body.style.backgroundSize = "135% 130%";
    } else {
      document.body.style.background =
        "radial-gradient(100% 244.46% at 0% 0%, rgb(68 69 0) 0%, rgb(124, 138, 44) 100%) 0% 0% / 115% 115%, radial-gradient(50% 122.23% at 50% 50%, rgb(91 100 36) 0%, rgb(104, 134, 3) 100%), radial-gradient(100.45% 245.58% at 0% 0%, rgb(44 85 2) 0%, rgb(141, 154, 33) 100%, rgb(141, 154, 33) 100%), linear-gradient(127.43deg, rgb(125 155 3) 0%, rgb(95, 103, 20) 100%)";
      document.body.style.backgroundBlendMode =
        "darken, color-dodge, difference, normal";
      document.body.style.backgroundSize = "135% 125%";
    }
    document.body.style.animation = "gradientShift 15s ease-in-out infinite";
    return () => {
      document.body.style.cssText = bodyOriginal;
      footer.style.cssText = footerOriginal;
      footerText.style.cssText = footerTextOriginal;
    };
  }, [isDarkMode]);

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"flex-end"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Box
          width={"100%"}
          minHeight={"25em"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          textAlign={"center"}
          gap={2}
          pb={5}
        >
          <Box p={2} gap={3}>
            <Typography fontSize={"40pt"} fontWeight={"bolder"}>
              Experimente mais liberdade <br />
              no controle da sua vida financeira.
            </Typography>
            <Typography variant="md">
              Crie sua conta Bytebank e aproveite todos os benefícios.
            </Typography>
          </Box>
        </Box>

        <Box
          minWidth={"100vw"}
          bgcolor={colors["lime.50"]}
          py={5}
          minHeight={"35em"}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          textAlign={"center"}
          gap={4}
        >
          <Typography
            fontSize={"35pt"}
            fontWeight={"bolder"}
            color={colors["lime.900"]}
          >
            Conheça as vantagens do nosso banco
          </Typography>
          <Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              gap={2}
              justifyContent={"center"}
              flexWrap={"wrap"}
            >
              {BENEFITS.map(
                ({ icon, title, description }: Benefit, index: number) => (
                  <Box maxWidth={"20em"} key={index}>
                    <BytebankCard
                      bgcolor={colors["lime.contrast"]}
                      variant={"outlined"}
                      styles={{ borderColor: colors["lime.100"] }}
                    >
                      <Box
                        minHeight={"21em"}
                        p={4}
                        gap={2}
                        color={colors["lime.100"]}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        {icon}
                        <Typography
                          variant="md"
                          fontWeight={"bold"}
                          color={colors["lime.400"]}
                          style={{ marginTop: "8px" }}
                        >
                          {title}
                        </Typography>
                        <Typography variant="sm" color={colors["lime.100"]}>
                          {description}
                        </Typography>
                      </Box>
                    </BytebankCard>
                  </Box>
                )
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BytebankHomePage;
