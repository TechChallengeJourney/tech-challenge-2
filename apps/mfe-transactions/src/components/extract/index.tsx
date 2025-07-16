import {
  BytebankCard,
  BytebankDivider,
  BytebankDrawer,
  BytebankSnackbar,
  BytebankText,
  SnackbarData,
} from  "@repo/ui";
import { Box, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useUser } from "@repo/data-access";
import { useFinancialData } from "@repo/data-access";
import { Transaction } from '@repo/data-access';
import EditExtractModal from './components/edit-modal';
import DeleteExtractModal from './components/delete-modal';
import IconButton from '@mui/material/IconButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterExtract from "./components/filter";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function BytebankExtract() {
  const { user } = useUser();
  const { fetchTransactions, extract, isLoading } = useFinancialData();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Transaction | null>(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const getTransactions = async () => {
      if (!user) return;
      await fetchTransactions(user);
      
    };
    getTransactions();
  }, [user]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenFilter(newOpen);
  };
  const numberFormat = (value: number) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  // Função para abrir modal de edição
  const handleEditMenu = (item: Transaction) => {
    handleClose()
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  // Função para abrir modal de exclusão
  const handleDeleteMenu = (item: Transaction) => {
    handleClose()
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarData(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTransactionUpdate = async (
    data: Transaction,
    newValue: string
  ) => {
    data.date = new Date();

    const response = await fetch(`/api/transactions/${data._id}`, {
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

  const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);

    // Formata a data no formato dd/mm/aaaa
    const formattedDate = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // Formata o horário no formato hh:mm
    const formattedTime = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedDate} às ${formattedTime}`;
  };

  return (
    <>
      <BytebankCard >
        <Box pb={4}>
          <Box p={4}>
            <BytebankText fontWeight={'bold'} variant={'md'}>
              Histórico de transações
            </BytebankText>
          </Box>
          <Box width={'100%'} display="flex" justifyContent="flex-end" px={4}>
            <IconButton
              color="primary"
              onClick={() => setOpenFilter(true)}
              size="small"
              
            >
              <FilterAltIcon  fontSize='small'  />
              <Typography fontSize={12}> Filtros</Typography>
            </IconButton>
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
                <BytebankDivider type="horizontal" />
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
              {extract  && extract.data?.length !== 0 ? (
                extract.data?.map((itens, index) => (
                  <Box key={index} maxHeight={'763px'} borderBottom={'1px solid #e3e3e3'}  overflow={'auto'} display={'flex'} flexDirection={'row'} justifyContent={"space-between"} alignItems={"center"} gap={2}>
                    <Box px={4} py={2} >
                      <Box display={'flex'} flexDirection="row" gap={'10px'}  alignItems="center">
                        <IconButton
                          color="primary"
                        >
                          {itens.type !== 'income' ? <ArrowUpwardIcon style={{ fontSize: '35px' }} /> : <ArrowUpwardIcon style={{ fontSize: '35px', transform: 'rotate(180deg)' }} />}
                        </IconButton>
                        <Box>
                          <Box
                            width="100%"
                            display="flex"
                            
                            flexDirection="row"
                            boxSizing={'border-box'}
                            fontWeight={600}
                          >
                            <BytebankText fontWeight={'bold'} color="primary" textTransform={'uppercase'}>
                            {itens.type}
                            </BytebankText>
                          </Box>
                          <Box
                            display="flex"
                            flexDirection="column"
                            gap="5px"
                          >
                            <BytebankText
                              textAlign={'left'}
                            >
                              {formatDateTime(itens.createdAt)}
                            </BytebankText>
                            <BytebankText
                              textAlign={'left'}
                              fontWeight={'bold'}
                              fontSize="20px"
                            >
                              {numberFormat(itens.value)}
                            </BytebankText>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <Box
                        key={index}
                        width="100%"
                        display="flex"
                        px={4}
                        flexDirection="row"
                        justifyContent="space-between"
                        boxSizing="border-box"
                        borderColor={'primary.main'}
                        paddingTop={'5px'}
                        paddingBottom={'20px'}
                        alignItems="center"
                        position={'relative'}
                      >
                        
                        <Box
                          display={'flex'}
                          flexDirection="column"
                          gap="5px"
                        >
                          
                          <Box display="flex">
                            <IconButton
                              color="primary"
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={handleClick}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="long-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              PaperProps={{
                                style: {
                                  maxHeight: 48 * 4.5, // Altura máxima do menu
                                  width: "20ch",
                                },
                              }}
                            >
                              <MenuItem onClick={() => handleEditMenu(itens)}>Editar</MenuItem>
                              <MenuItem onClick={() => handleDeleteMenu(itens)}>Excluir</MenuItem>
                            </Menu>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    
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
          handleTransactionDelete(selectedItem._id);
        }}
      />
      <BytebankSnackbar
        open={snackbarOpen}
        data={snackbarData}
        onClose={closeSnackbar}
      />
      <BytebankDrawer anchor="right" open={openFilter} onClose={toggleDrawer(false)} title="Filtros" >
        <FilterExtract></FilterExtract>
      </BytebankDrawer>
    </>
  );
}