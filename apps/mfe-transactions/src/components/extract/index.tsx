import {
  BytebankCard,
  BytebankDivider,
  BytebankDrawer,
  BytebankPagination,
  BytebankSnackbar,
  BytebankText,
  SnackbarData,
} from  "@repo/ui";
import { Box, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { api, useUser } from "@repo/data-access";
import { useFinancialData } from "@repo/data-access";
import { Transaction } from '@repo/data-access';
import DeleteExtractModal from './components/delete-modal';
import IconButton from '@mui/material/IconButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterExtract from "./components/filter";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditExtract from "./components/edit";

export function BytebankExtract() {
  const { user } = useUser();
  const { fetchTransactions, extract, isLoading, categories } = useFinancialData();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Transaction | null>(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [menuState, setMenuState] = useState<{
    anchorEl: HTMLElement | null;
    item: Transaction | null;
  }>({
    anchorEl: null,
    item: null,
  });

  useEffect(() => {
    if (user) fetchTransactions(user);
  }, [user]);

  const toggleDrawer = (newOpen: boolean) => () => setOpenFilter(newOpen);
  const toggleDrawerEdit = (newOpen: boolean) => () => setOpenEdit(newOpen);

  const numberFormat = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>, item: Transaction) => {
    setMenuState({ anchorEl: event.currentTarget, item });
  };

  const handleCloseMenu = () => {
    setMenuState({ anchorEl: null, item: null });
  };

  const handleEditMenu = () => {
    if (menuState.item) setSelectedItem(menuState.item);
    setOpenEdit(true);
    handleCloseMenu();
  };

  const handleDeleteMenu = () => {
    if (menuState.item) setSelectedItem(menuState.item);
    setDeleteModalOpen(true);
    handleCloseMenu();
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarData(null);
  };

  const findCategoryName = (id: string) =>
    categories?.find((cat) => cat._id === id)?.name || 'Unknown Category';

  const handleTransactionDelete = async (id: string) => {
    try {
      await api.delete(`/transactions/${id}`, { data: { id } });
      setSnackbarData({ status: 'success', message: 'Transação excluída com sucesso!' });
      setSnackbarOpen(true);
      user && fetchTransactions(user);
    } catch {
      setSnackbarData({ status: 'error', message: 'Erro ao excluir transação' });
      setSnackbarOpen(true);
    }
  };

  const formatDateTime = (iso: string) => {
    const d = new Date(iso);
    return `${d.toLocaleDateString('pt-BR')} às ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <>
      <BytebankCard styles={{ height: '100%' }}>
        {/* Cabeçalho */}
        <Box p={4} pb={0}>
          <BytebankText fontWeight="bold" variant="md">Histórico de transações</BytebankText>
        </Box>

        {/* Botão Filtros (drawer) */}
        <Box width="100%" display="flex" justifyContent="flex-end" px={4}>
          <IconButton
            color="primary"
            size="small"
            onClick={() => setOpenFilter(true)}
            style={{ border: '1px solid #e0e0e0', borderRadius: 4 }}
          >
            <FilterAltIcon fontSize="small" />
            <Typography fontSize={12}>Filtros</Typography>
          </IconButton>
        </Box>

        {/* Lista */}
        {isLoading ? (
          <Box>
            {[...Array(2)].map((_, i) => (
              <Box key={i} px={4}>
                <Skeleton width={40} variant="text" sx={{ fontSize: '1.5rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                <BytebankDivider type="horizontal" />
              </Box>
            ))}
          </Box>
        ) : (
          <>
            {extract?.data?.length ? (
              extract.data.map((it, idx) => (
                <Box key={idx} minHeight="100px" borderBottom="1px solid #e3e3e3" display="flex" justifyContent="space-between" alignItems="center">
                  <Box px={4} py={2} display="flex" gap="10px" alignItems="center">
                    <IconButton color="primary" style={{ border: '1px solid #e0e0e0' }}>
                      <ArrowUpwardIcon style={{ fontSize: 35, transform: it.type === 'income' ? 'rotate(180deg)' : 'none' }} />
                    </IconButton>
                    <Box>
                      <BytebankText fontWeight="bold" color="primary" textTransform="uppercase">
                        {findCategoryName(it.categoryId!)}
                      </BytebankText>
                      <BytebankText>{formatDateTime(it.createdAt)}</BytebankText>
                      <BytebankText fontWeight="bold" fontSize="20px">{numberFormat(it.value)}</BytebankText>
                    </Box>
                  </Box>
                  <Box px={4}>
                    <IconButton onClick={(e) => handleClickMenu(e, it)} color="primary">
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))
            ) : (
              <Box textAlign="center" px={4} pb={4} display="flex" flexDirection="column" alignItems="center" gap={2}>
                <ErrorOutlineIcon color="error" sx={{ fontSize: 50 }} />
                <BytebankText variant="sm">Não encontramos nenhuma transação, que tal criar uma nova?</BytebankText>
              </Box>
            )}

            {/* Paginação */}
            {extract?.data?.length && (
              <Box display="flex" justifyContent="center" py={2}>
                <BytebankPagination
                  totalPages={extract.pagination?.totalPages || 1}
                  currentPage={extract.pagination?.page || 1}
                  onPageChange={(e, page) => user && fetchTransactions(user, { limit: 4, page })}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </BytebankCard>

      {/* Menu */}
      <Menu
        anchorEl={menuState.anchorEl}
        open={Boolean(menuState.anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{ style: { maxHeight: 48 * 4.5, width: '20ch' } }}
      >
        <MenuItem onClick={handleEditMenu}>Editar</MenuItem>
        <MenuItem onClick={handleDeleteMenu}>Excluir</MenuItem>
      </Menu>

      {/* Drawer de edição */}
      <BytebankDrawer anchor="right" open={openEdit} onClose={toggleDrawerEdit(false)} title="Editar">
        <EditExtract
          toggleDrawer={toggleDrawerEdit}
          item={selectedItem as Transaction}
        />
      </BytebankDrawer>

      {/* Modal de exclusão */}
      <DeleteExtractModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        item={selectedItem}
        onConfirm={async () => {
          if (!selectedItem) return;
          setDeleteModalOpen(false);
          await handleTransactionDelete(selectedItem._id);
        }}
      />

      {/* Snackbar */}
      <BytebankSnackbar open={snackbarOpen} data={snackbarData} onClose={closeSnackbar} />

      {/* Drawer de filtros */}
      <BytebankDrawer anchor="right" open={openFilter} onClose={toggleDrawer(false)} title="Filtros">
        <FilterExtract toggleDrawer={(newOpen) => () => setOpenFilter(newOpen)} />
      </BytebankDrawer>
    </>
  );
}
