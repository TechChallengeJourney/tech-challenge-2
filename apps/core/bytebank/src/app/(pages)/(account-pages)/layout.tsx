'use client';
import { Container } from "@mui/material";
import { BytebankWrapper } from "@bytebank/shared";

const RootLayout = ({ children,
}: {
    children: React.ReactNode;
}) => {

    return (
        <BytebankWrapper>
            <Container>{children}</Container>
        </BytebankWrapper>
    );
}

export default RootLayout;