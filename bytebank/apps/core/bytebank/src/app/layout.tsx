import './global.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bytebank',
    description: 'Projeto desenvolvido para fins educacionais.',
};

const RootLayout = ({ children,
}: {
    children: React.ReactNode;
}) => {

    return (
        <html lang="pt-br">
            <body>
                <main>{children}</main>
            </body>
        </html>
    );
}

export default RootLayout;