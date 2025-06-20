import { VisibilityRounded, VisibilityOff } from "@mui/icons-material";
import { Box, Typography, Skeleton } from "@mui/material";
import { BytebankCard, useTheme } from "@repo/ui";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

export const BytebankBalanceCard = () => {
    const [visible, setVisible] = useState(false);
    const { colors } = useTheme();
    const { user } = { user: { name: "João Silva" } };
    const today = new Date();
    const formattedDate = format(today, "EEEE',' dd/MM/yyyy", { locale: ptBR });

    const totalValue = 12356.78;
    const isLoading = false;
    const totalBalanceFormatted = totalValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    const backgroundStyle = {
        border: "none",
        backgroundImage: `
        url('/images/pixels.svg'),
        ${colors["background.gradient"]}
        
      `,
        backgroundPosition: "right top, left bottom",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundSize: "contain",
    };

    return (
        <Box display={"block"} width={"100%"} minHeight={"15em"}>
            <BytebankCard styles={backgroundStyle}>
                <Box display={"flex"} flexDirection={"column"} p={4}>
                    <Typography color={"textPrimary"} fontWeight={"bold"} variant="lg">
                        {`Bem-vindo(a), ${user?.name?.split(" ")[0] ?? "usuário"}!`}
                    </Typography>
                    <Typography color={"textPrimary"} variant="xs">
                        {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
                    </Typography>
                </Box>

                <Box display={"flex"} flexDirection={"column"} p={4}>
                    <Box display={"flex"} alignContent={"center"} gap={1}>
                        <Typography
                            color={"textPrimary"}
                            sx={{ fontWeight: 600 }}
                            variant="md"
                        >
                            Saldo
                        </Typography>
                        <Box
                            onClick={() => (setVisible(!visible))}
                            style={{ cursor: "pointer" }}
                            display={'flex'}
                            alignItems={'center'}
                        >

                            {visible ? <VisibilityRounded /> : <VisibilityOff />}
                        </Box>
                    </Box>
                    <Box display={"flex"} flexDirection={"column"}>
                        {isLoading ? (
                            <Skeleton width={200} height={50} animation="wave" />
                        ) : (
                            <Typography
                                color={"textPrimary"}
                                sx={{ fontWeight: 600 }}
                                variant="xxl"
                            >
                                {visible ? `${totalBalanceFormatted}` : <Skeleton width={200} height={50} animation={false} />}
                            </Typography>
                        )}

                        <Typography color={"textTertiary"} fontSize={"xs"}>
                            Conta Corrente
                        </Typography>
                    </Box>
                </Box>
            </BytebankCard>
        </Box>
    );
};
