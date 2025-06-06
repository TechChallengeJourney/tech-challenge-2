import { Box } from '@mui/material';
import {
  BytebankText,
  BytebankCard,
  BytebankIllustration,
  palette,
} from '@bytebank/shared';
import './style.scss';
import Link from 'next/link';

interface ProductCardProps {
  imageName: string;
  path: string;
  title: string;
}

const data = [
  {
    title: 'Empréstimo',
    path: '',
    imageName: 'Icone_emprestimo',
  },
  {
    title: 'Meus cartões',
    path: 'meus-cartoes',
    imageName: 'Icone_cartoes',
  },
  {
    title: 'Doações',
    path: '',
    imageName: 'Icone_doacoes',
  },
  {
    title: 'Pix',
    path: '',
    imageName: 'Icone_Pix',
  },
  {
    title: 'Seguros',
    path: '',
    imageName: 'Icone_seguros',
  },
  {
    title: 'Crédito celular',
    path: '',
    imageName: 'Icone_emprestimo_1',
  },
];

const ProductCard = ({ imageName, path, title }: ProductCardProps) => {
  return (
    <Link href={`/outros/${path}`} className="product-link">
      <Box
        sx={{ background: palette['white.main'], borderRadius: '8px' }}
        height={167}
        display={'flex'}
        flexDirection={'column'}
        gap={'16px'}
        justifyContent={'center'}
        alignItems={'center'}
        border={`2px solid ${palette['white.main']}`}
      >
        <BytebankIllustration name={imageName} />
        <BytebankText
          variant="sm"
          fontWeight="bold"
          color={palette['black.main']}
        >
          {title}
        </BytebankText>
      </Box>
    </Link>
  );
};

export const BytebankProducts = () => {
  return (
    <BytebankCard bgIllustration="grey">
      <Box p={4}>
        <BytebankText variant="lg" color="black">
          Confira os serviços disponíveis
        </BytebankText>
      </Box>
      <Box className="productsWrapper">
        {data.map(({ imageName, path, title }: ProductCardProps, i) => (
          <ProductCard
            key={i}
            imageName={imageName}
            path={path}
            title={title}
          />
        ))}
      </Box>
    </BytebankCard>
  );
};
