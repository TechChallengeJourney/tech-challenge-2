'use client';

import {
  BytebankButton,
  BytebankIllustration,
  BytebankText,
  BytebankWrapper,
  BytebankLoginModal,
  BytebankRegisterModal,
  BytebankSnackbar,
  AccessModalType,
  SnackbarData,
} from '@bytebank/shared';
import {
  AssuredWorkload,
  CardGiftcardOutlined,
  DevicesOtherOutlined,
  StarBorderOutlined,
} from '@mui/icons-material';
import { Box, useMediaQuery } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { ReactElement, useState } from 'react';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import BytebankAuthRedirect from './(pages)/_components/loading-page/auth-redirect';

type Benefit = {
  icon: ReactElement;
  title: string;
  description: string;
};

const BENEFITS: Benefit[] = [
  {
    icon: <CardGiftcardOutlined color="success" sx={{ fontSize: 80 }} />,
    title: 'Conta e cartão gratuitos',
    description:
      'Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.',
  },
  {
    icon: <AssuredWorkload color="success" sx={{ fontSize: 80 }} />,
    title: 'Saques sem custo',
    description:
      'Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.',
  },
  {
    icon: <StarBorderOutlined color="success" sx={{ fontSize: 80 }} />,
    title: 'Programa de pontos',
    description:
      'Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!',
  },
  {
    icon: <DevicesOtherOutlined color="success" sx={{ fontSize: 80 }} />,
    title: 'Seguro Dispositivos',
    description:
      'Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.',
  },
];

export default function Index(): ReactElement {
  const router = useRouter();
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const closeLoginModal = () => setOpenLoginModal(false);
  const closeRegisterModal = () => setOpenRegisterModal(false);

  const closeSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarData(null);
  };

  const handleLoginModal = ({ status, message }: SnackbarData) => {
    if (status === 'success') {
      router.push('/home');
      setTimeout(() => {
        closeLoginModal();
      }, 20000);
    } else {
      closeRegisterModal();
      setSnackbarData({ status, message });
      setSnackbarOpen(true);
    }
  };

  const handleRegisterModal = ({ status, message }: SnackbarData) => {
    if (status === 'success') {
      closeRegisterModal();
    }

    closeLoginModal();
    setSnackbarData({ status, message });
    setSnackbarOpen(true);
  };

  const handleModalStates = (type: AccessModalType) => {
    if (type === AccessModalType.REGISTER) {
      closeRegisterModal();
      setOpenLoginModal(true);
    } else {
      closeLoginModal();
      setOpenRegisterModal(true);
    }
  };

  const renderBanner = (): ReactElement => (
    <div className={styles.banner}>
      <BytebankText
        className={styles.bannerText}
        variant="md"
        color="black"
        sx={{ fontWeight: 600 }}
      >
        Experimente mais liberdade no controle da sua vida financeira. Crie sua
        conta com a gente!
      </BytebankText>

      <BytebankIllustration
        className={styles.illustration}
        variant="auto"
        name="graphic"
      />
    </div>
  );

  const renderMobileButtons = (): ReactElement | null => {
    if (!isMobile) return null;

    return (
      <div className={styles.mobileButtonsWrapper}>
        <BytebankButton
          color="black"
          label="Abrir conta"
          variant="contained"
          sendSubmit={() => setOpenRegisterModal(true)}
        />
        <BytebankButton
          variant="outlined"
          color="black"
          label="Já tenho conta"
          sendSubmit={() => setOpenLoginModal(true)}
        />
      </div>
    );
  };

  const renderValuePropositionBlock = (): ReactElement => (
    <>
      {renderMobileButtons()}

      <BytebankText variant="h1" color="black" sx={{ fontWeight: 600 }}>
        Vantagens do nosso banco:
      </BytebankText>

      <Box
        display="flex"
        sx={{
          flexDirection: {
            xs: 'column',
            sm: 'row',
            md: 'row',
          },
          gap: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
        justifyContent="center"
        alignItems="center"
        gap={2}
        flexWrap="wrap"
      >
        {BENEFITS.map(
          ({ icon, title, description }: Benefit, index: number) => (
            <Box key={index} className={styles.valueProposition}>
              {icon}
              <BytebankText
                variant="sm"
                color="success"
                sx={{ fontWeight: 600 }}
              >
                {title}
              </BytebankText>
              <BytebankText className={styles.text}>{description}</BytebankText>
            </Box>
          )
        )}
      </Box>
    </>
  );

  return (
    <BytebankWrapper>
      <BytebankAuthRedirect>
        <div className={styles.contentWrapper}>
          {renderBanner()}
          {renderValuePropositionBlock()}
        </div>
        <BytebankRegisterModal
          open={openRegisterModal}
          onClose={closeRegisterModal}
          onSubmit={handleRegisterModal}
          openModal={handleModalStates}
        />
        <BytebankLoginModal
          open={openLoginModal}
          onClose={closeLoginModal}
          onSubmit={handleLoginModal}
          openModal={handleModalStates}
        />
        <BytebankSnackbar
          open={isSnackbarOpen}
          data={snackbarData}
          onClose={closeSnackbar}
        />
      </BytebankAuthRedirect>
    </BytebankWrapper>
  );
}
