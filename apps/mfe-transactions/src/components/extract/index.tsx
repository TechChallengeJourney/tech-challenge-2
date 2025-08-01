import {
  BytebankCard,
  BytebankDivider,
  BytebankDrawer,
  BytebankPagination,
  BytebankSnackbar,
  BytebankText,
  SnackbarData,
} from "@repo/ui";
import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { api, useUser } from "@repo/data-access";
import { useFinancialData } from "@repo/data-access";
import { Transaction } from "@repo/data-access";
import DeleteExtractModal from "./components/delete-modal";
import IconButton from "@mui/material/IconButton";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterExtract from "./components/filter";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditExtract from "./components/edit";
import { useTheme } from '@repo/utils';

export function BytebankExtract() {
  const { user } = useUser();
  const { fetchTransactions, extract, isLoading, categories } =
    useFinancialData();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Transaction | null>(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [anchorEls, setAnchorEls] = useState<{
    [key: string]: HTMLElement | null;
  }>({});
    const { isDarkMode, colors } = useTheme();

  useEffect(() => {
    const getTransactions = () => {
      if (!user) return;
      fetchTransactions(user);
    };
    getTransactions();
  }, [user]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenFilter(newOpen);
  };

  const toggleDrawerEdit = (newOpen: boolean) => () => {
    setOpenEdit(newOpen);
  };
  const numberFormat = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const handleClose = (id: string) => {
    setAnchorEls((prev) => ({ ...prev, [id]: null }));
  };
  // Função para abrir modal de edição
  const handleEditMenu = (item: Transaction) => {
    setOpenEdit(true);
    handleClose(item?._id);
    setSelectedItem(item);
  };

  // Função para abrir modal de exclusão
  const handleDeleteMenu = (item: Transaction) => {
    handleClose(item?._id);
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarData(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEls((prev) => ({ ...prev, [id]: event.currentTarget }));
  };

  const findCategoryName = (categoryId: string) => {
    const category = categories?.find((cat) => cat._id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  const handleTransactionDelete = async (id: string) => {
    api
      .delete(`/transactions/${id}`, { data: { id } })
      .then(() => {
        setSnackbarData({
          status: "success",
          message: "Transação excluída com sucesso!",
        });
        setSnackbarOpen(true);
        if (user) {
          fetchTransactions(user);
        }
      })
      .catch(() => {
        errorSnackBar();
      });
  };

  const errorSnackBar = () => {
    setSnackbarData({
      status: "error",
      message: "Algo deu errado. Por favor, aguarde e tente novamente!",
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
      <BytebankCard styles={{ height: "100%" }}>
        <Box>
          <Box p={4} pb={0}>
            <BytebankText fontWeight={"bold"} variant={"md"}>
              Histórico de transações
            </BytebankText>
          </Box>
          <Box width={"100%"} display="flex" justifyContent="flex-end" px={4}>
            <IconButton
              color="primary"
              onClick={() => setOpenFilter(true)}
              size="small"
              style={{
                borderRadius: "2em",
                padding: "0.6em 1em",
                backgroundColor: isDarkMode ? colors['lime.100'] : colors['lime.100'],
              }}
            >
              <FilterAltIcon fontSize="small" />
              <Typography fontSize={14} fontWeight={'bold'}> Filtros</Typography>
            </IconButton>
          </Box>
          {/* Lista de extratos */}
          {isLoading ? (
            <Box>
              <Box px={4}>
                <Skeleton
                  width={40}
                  variant="text"
                  sx={{ fontSize: "1.5rem" }}
                />
                <Skeleton
                  width="full"
                  variant="text"
                  sx={{ fontSize: "1.5rem" }}
                />
                <Skeleton
                  width="full"
                  variant="text"
                  sx={{ fontSize: "1.5rem" }}
                />
              </Box>
              <Box my={2}>
                <BytebankDivider type="horizontal" />
              </Box>
              <Box px={4}>
                <Skeleton
                  width={40}
                  variant="text"
                  sx={{ fontSize: "1.5rem" }}
                />
                <Skeleton
                  width="full"
                  variant="text"
                  sx={{ fontSize: "1.5rem" }}
                />
                <Skeleton
                  width="full"
                  variant="text"
                  sx={{ fontSize: "1.5rem" }}
                />
              </Box>
            </Box>
          ) : (
            <>
              {extract && extract.data?.length !== 0 ? (
                extract.data?.map((itens, index) => (
                  <Box
                    key={index}
                    minHeight={"100px"}
                    borderBottom={"1px solid #e3e3e3"}
                    overflow={"auto"}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Box pl={4} py={2}>
                      <Box
                        display={"flex"}
                        flexDirection="row"
                        gap={"10px"}
                        alignItems="center"
                      >
                        <Box mr={1}>
                          {itens.type !== "income" ? (
                            <Box
                              display="flex"
                              color={ isDarkMode ? colors['grey.200'] : colors['grey.900']}
                              alignItems="center"
                              sx={{
                                backgroundColor: isDarkMode ? colors['grey.900'] : colors['grey.200'],
                                borderRadius: "50px",
                                padding: "10px",
                              }}
                            >
                              <ArrowUpwardIcon style={{ fontSize: "35px" }} />
                            </Box>
                          ) : (
                            <Box
                              display="flex"
                              color="primary"
                              sx={{
                                backgroundColor: isDarkMode ? colors['lime.100'] : colors['lime.100'],
                                borderRadius: "50px",
                                padding: "10px",
                              }}
                              alignItems="center"
                            >
                              <ArrowUpwardIcon
                                style={{
                                  fontSize: "35px",
                                  transform: "rotate(180deg)",
                                  color: isDarkMode ? colors['lime.900'] : colors['lime.900']
                                }}
                              />
                            </Box>
                          )}
                        </Box>
                        <Box>
                          <Box
                            width="100%"
                            display="flex"
                            flexDirection="row"
                            boxSizing={"border-box"}
                            fontWeight={600}
                          >
                            <BytebankText
                              fontWeight={"bold"}
                              color="primary"
                              textTransform={"uppercase"}
                            >
                              {findCategoryName(itens.categoryId!)}
                            </BytebankText>
                          </Box>
                          <Box display="flex" flexDirection="column" gap="5px">
                            <BytebankText textAlign={"left"}>
                              {formatDateTime(itens.createdAt)}
                            </BytebankText>
                            <BytebankText
                              textAlign={"left"}
                              fontWeight={"bold"}
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
                        pr={{xs: 1, md: 3}}
                        flexDirection="row"
                        justifyContent="space-between"
                        boxSizing="border-box"
                        borderColor={"primary.main"}
                        alignItems="center"
                        position={"relative"}
                      >
                        <Box>
                          <Box>
                            <IconButton
                              color="primary"
                              aria-label="more"
                              aria-controls={`menu-${itens._id}`}
                              aria-haspopup="true"
                              onClick={(e) => handleClick(e, itens._id)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id={`menu-${itens._id}`}
                              anchorEl={anchorEls[itens._id] || null}
                              open={Boolean(anchorEls[itens._id])}
                              onClose={() => handleClose(itens._id)}
                              PaperProps={{
                                style: {
                                  maxHeight: 48 * 4.5,
                                  width: "20ch",
                                },
                              }}
                            >
                              <MenuItem
                                onClick={() => {
                                  handleEditMenu(itens);
                                  handleClose(itens._id);
                                }}
                              >
                                Editar
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleDeleteMenu(itens);
                                  handleClose(itens._id);
                                }}
                              >
                                Excluir
                              </MenuItem>
                            </Menu>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))
              ) : (
                <Box
                  textAlign={"center"}
                  px={4}
                  pb={4}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  gap={2}
                >
                  <ErrorOutlineIcon color="error" sx={{ fontSize: "50px" }} />
                  <BytebankText variant={"sm"}>
                    Não encontramos nenhuma transação, que tal criar uma nova?
                  </BytebankText>
                </Box>
              )}
              {extract && extract.data?.length !== 0 && (
                <Box display={"flex"} justifyContent={"center"} py={2}>
                  <BytebankPagination
                    totalPages={extract.pagination?.totalPages || 1}
                    currentPage={extract.pagination?.page || 1}
                    onPageChange={(e, page) => {
                      if (user) {
                        fetchTransactions(user, { limit: 4, page: page });
                      }
                    }}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </BytebankCard>

      <BytebankDrawer
        anchor="right"
        open={openEdit}
        onClose={toggleDrawerEdit(false)}
        title="Editar"
      >
        <EditExtract
          toggleDrawer={toggleDrawerEdit}
          item={selectedItem as Transaction}
        />
      </BytebankDrawer>

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
      <BytebankDrawer
        anchor="right"
        open={openFilter}
        onClose={toggleDrawer(false)}
        title="Filtros"
      >
        <FilterExtract
          toggleDrawer={(newOpen) => () => setOpenFilter(newOpen)}
        />
      </BytebankDrawer>
    </>
  );
}
