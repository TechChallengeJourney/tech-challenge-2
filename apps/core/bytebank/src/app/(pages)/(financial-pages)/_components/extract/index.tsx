'use client';
import {
  BytebankCard,
  BytebankDivider,
  BytebankSnackbar,
  BytebankText,
  SnackbarData,
} from '@bytebank/shared';
import { Box, Skeleton } from '@mui/material';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useUser } from '@bytebank/shared';
import { useFinancialData } from '@bytebank/shared';
import { Transaction } from '@bytebank/shared';
import EditExtractModal from './_components/edit-modal';
import DeleteExtractModal from './_components/delete-modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export function BytebankExtract() {
  const { user } = useUser();
  const { fetchTransactions, extract, isLoading } = useFinancialData();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Transaction | null>(null);

  useEffect(() => {
    const getTransactions = async () => {
      if (!user) return;
      await fetchTransactions(user);
    };

    getTransactions();
  }, [user]);

  const numberFormat = (value: number) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  // Função para abrir modal de edição
  const handleEdit = (item: Transaction) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  // Função para abrir modal de exclusão
  const handleDelete = (item: Transaction) => {
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarData(null);
  };

  const handleTransactionUpdate = async (
    data: Transaction,
    newValue: string
  ) => {
    data.value = (Number(newValue) / 100).toString();
    data.date = new Date();

    const response = await fetch(`/api/transactions/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setSnackbarData({
        status: 'success',
        message: 'Transação adicionada com sucesso!',
      });
      setSnackbarOpen(true);
      if (user) {
        fetchTransactions(user);
      }
    } else {
      errorSnackBar();
    }
  };
  const handleTransactionDelete = async (id: string) => {
    const response = await fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });

    if (response.ok) {
      setSnackbarData({
        status: 'success',
        message: 'Transação excluída com sucesso!',
      });
      setSnackbarOpen(true);
      if (user) {
        fetchTransactions(user);
      }
    } else {
      errorSnackBar();
    }
  };

  const errorSnackBar = () => {
    setSnackbarData({
      status: 'error',
      message: 'Algo deu errado. Por favor, aguarde e tente novamente!',
    });
    setSnackbarOpen(true);
  };

  return (
    <>
      <BytebankCard bgcolor={'#FFF'}>
        <Box pb={4}>
          <Box p={4}>
            <BytebankText fontWeight={'bold'} variant={'md'}>
              Extrato
            </BytebankText>
          </Box>
          {/* Lista de extratos */}
          {isLoading ? (
            <Box>
              <Box px={4}>
                <Skeleton
                  width={40}
                  variant="text"
                  sx={{ fontSize: '1.5rem' }}
                />
                <Skeleton
                  width="full"
                  variant="text"
                  sx={{ fontSize: '1.5rem' }}
                />
                <Skeleton
                  width="full"
                  variant="text"
                  sx={{ fontSize: '1.5rem' }}
                />
              </Box>
              <Box my={2}>
                <BytebankDivider type="horizontal" color="primary" />
              </Box>
              <Box px={4}>
                <Skeleton
                  width={40}
                  variant="text"
                  sx={{ fontSize: '1.5rem' }}
                />
                <Skeleton
                  width="full"
                  variant="text"
                  sx={{ fontSize: '1.5rem' }}
                />
                <Skeleton
                  width="full"
                  variant="text"
                  sx={{ fontSize: '1.5rem' }}
                />
              </Box>
            </Box>
          ) : (
            <>
              {extract?.length !== 0 ? (
                extract?.map((itens, index) => (
                  <Box key={index} maxHeight={'763px'} overflow={'auto'}>
                    <Box
                      width="100%"
                      display="flex"
                      px={4}
                      flexDirection="row"
                      boxSizing={'border-box'}
                      fontWeight={600}
                    >
                      <BytebankText fontWeight={'bold'} color="primary">
                        {itens.month.charAt(0).toUpperCase() +
                          itens.month.slice(1)}
                      </BytebankText>
                    </Box>
                    {itens.data.map((item: Transaction, index: number) => (
                      <Box
                        key={index}
                        width="100%"
                        display="flex"
                        px={4}
                        flexDirection="row"
                        justifyContent="space-between"
                        boxSizing="border-box"
                        borderBottom={
                          itens.data.length !== index + 1 ? '1px solid ' : ''
                        }
                        borderColor={'primary.main'}
                        paddingTop={'20px'}
                        paddingBottom={'20px'}
                        alignItems="center"
                        position={'relative'}
                      >
                        <Box
                          width="80%"
                          display="flex"
                          flexDirection="column"
                          gap="5px"
                        >
                          <BytebankText
                            textAlign={'left'}
                            color={+item.value < 0 ? 'error' : 'primary'}
                          >
                            {item.type}
                          </BytebankText>
                          <BytebankText
                            textAlign={'left'}
                            color={+item.value < 0 ? 'error' : 'primary'}
                          >
                            {numberFormat(+item.value)}
                          </BytebankText>
                        </Box>
                        <Box
                          display={'flex'}
                          flexDirection="column"
                          gap="5px"
                          justifyContent={'space-between'}
                        >
                          <BytebankText
                            fontSize="12px"
                            color={+item.value < 0 ? 'error' : 'primary'}
                          >
                            {format(item.date, 'dd/MM/yyyy')}
                          </BytebankText>
                          <Box display="flex">
                            <IconButton
                              color="primary"
                              onClick={() => handleEdit(item)}
                              size="small"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="primary"
                              onClick={() => handleDelete(item)}
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ))
              ) : (
                <Box
                  textAlign={'center'}
                  px={4}
                  pb={4}
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'center'}
                  gap={2}
                >
                  <ErrorOutlineIcon color="error" sx={{ fontSize: '50px' }} />
                  <BytebankText variant={'sm'}>
                    Não encontramos nenhuma transação, que tal criar uma nova?
                  </BytebankText>
                </Box>
              )}
            </>
          )}
        </Box>
      </BytebankCard>

      <EditExtractModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        item={selectedItem as Transaction}
        onSave={async (newValue) => {
          if (!selectedItem) return;
          handleTransactionUpdate(selectedItem, newValue);
        }}
      />
      <DeleteExtractModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        item={selectedItem}
        onConfirm={async () => {
          if (!selectedItem) return;
          setDeleteModalOpen(false);
          handleTransactionDelete(selectedItem.id);
        }}
      />
      <BytebankSnackbar
        open={snackbarOpen}
        data={snackbarData}
        onClose={closeSnackbar}
      />
    </>
  );
}
