import {
    BytebankCardBank,
    useUser,
    BytebankText,
    BankCard,
    BytebankButton,
    BytebankCard
} from '@bytebank/shared';
import React, { useEffect, useState } from 'react';

import styles from './my-bank-cards.module.scss';

import { Box, Skeleton } from '@mui/material';

const MyBankCards: React.FC = () => {
    const { user } = useUser();

    const [bankCards, setBankCards] = useState<BankCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBankCards = async () => {
            if (!user?.id) return;

            try {
                const response = await fetch(`/api/bank-card?userId=${user.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Erro ao buscar cartões bancários');
                }


                setBankCards(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Ocorreu um erro, tente novamente mais tarde!');
            } finally {
                setLoading(false);
            }
        };

        fetchBankCards()
    }, [user?.id])

    return (

        <BytebankCard bgIllustration='grey' className={styles.card}>
            <Box className={styles.container}>
                <BytebankText color="black" fontSize="24px" fontWeight={600} >
                    Meus cartões
                </BytebankText>
                {loading ?
                    <>
                        <Skeleton width={360} variant="text" sx={{ fontSize: '1.5rem' }} />
                        <Skeleton width={360} height={200} variant='rounded' />
                    </> :
                    <>
                        {error ? <BytebankText>{error}</BytebankText> :
                            <>
                                {bankCards.map((card: BankCard) => {
                                    return (
                                        <Box className={styles.cardContainer} key={card.id}>
                                            <BytebankText color="black" fontSize="20px" fontWeight={400}>
                                                Cartão {card.variant}
                                            </BytebankText>
                                            <Box className={styles.info}>
                                                <BytebankCardBank variant={card.variant} details={card} />
                                                <Box className={styles.actions}>
                                                    <BytebankButton color="secondary" label="Configurar" variant="contained" />
                                                    <BytebankButton color="secondary" label="Bloquear" variant="outlined" />
                                                    <BytebankText color="black" variant="sm" fontWeight={400}>
                                                        Função: {card.functions.join("/")}
                                                    </BytebankText>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </>
                        }
                    </>
                }
            </Box >
        </BytebankCard>
    )
}

export default MyBankCards;