import React from 'react';
import { BytebankButton } from "@repo/ui";
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from "@mui/material";

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
};

type TransactionsProps = {
  transactions?: Transaction[];
  onViewMore?: () => void;
};

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-06-28',
    description: 'Salário',
    amount: 5000.00,
    type: 'deposit'
  },
  {
    id: '2',
    date: '2025-06-29',
    description: 'Supermercado',
    amount: 350.75,
    type: 'withdrawal'
  },
  {
    id: '3',
    date: '2025-06-30',
    description: 'Transferência recebida',
    amount: 1200.00,
    type: 'deposit'
  }
];

const Transactions = ({ transactions = mockTransactions, onViewMore }: TransactionsProps) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Últimas Transações
      </Typography>
      <Paper elevation={2} sx={{ p: 2 }}>
        <List>
          {transactions.map((transaction, index) => (
            <React.Fragment key={transaction.id}>
              <ListItem>
                <ListItemText
                  primary={transaction.description}
                  secondary={transaction.date}
                />
                <Typography
                  variant="body2"
                  color={transaction.type === 'deposit' ? 'success.main' : 'error.main'}
                  sx={{ fontWeight: 'bold' }}
                >
                  {transaction.type === 'deposit' ? '+' : '-'} 
                  {transaction.amount.toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  })}
                </Typography>
              </ListItem>
              {index < transactions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <BytebankButton
            variant="contained"
            color="primary"
            label="Ver todas as transações"
            sendSubmit={onViewMore}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Transactions;
