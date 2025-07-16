import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";

interface TabOption {
  label: string;
  id: string;
}

interface BytebankTabsProps {
  options: TabOption[];
  onChangeTab?: (id: string) => void; // A prop recebe o ID diretamente
  children: React.ReactNode;
}

export function BytebankTabs({
  options,
  onChangeTab,
  children,
}: BytebankTabsProps) {
  // O único estado necessário é o 'value' (índice da aba) para o controle do MUI
  const [value, setValue] = useState(0);

  // REMOVIDO: O estado 'tab' não é mais necessário.
  // const [tab, setTab] = useState("");

  // Este useEffect garante que o pai seja notificado sobre a aba inicial.
  useEffect(() => {
    if (options?.[value]) {
      onChangeTab?.(options[value].id);
    }
  }, []); // O array vazio [] garante que isso rode apenas uma vez, na montagem.


  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    // 1. Atualiza o estado do índice da aba
    setValue(newValue);

    // 2. Encontra o ID da aba correspondente usando o novo índice
    const newTabId = options[newValue].id;
    
    // 3. Chama o callback com o ID correto e atualizado
    onChangeTab?.(newTabId);
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          borderRadius: "6px",
          overflow: "hidden",
          border: "1px solid #D4E157",
          display: "inline-block",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="custom styled tabs"
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            "& .MuiTab-root": {
              width: `${100 / options.length}%`,
              fontWeight: "400",
              fontSize: "0.875rem",
              textTransform: "uppercase",
              color: "#5B6327",
              borderRight: "1px solid #D4E157",
              transition: "all 0.2s ease-in-out",
            },
            "& .MuiTab-root:last-of-type": {
              borderRight: "none",
            },
            "& .Mui-selected": {
              backgroundColor: "#D4E157",
              color: "#20240c",
            },
          }}
        >
          {/* REMOVIDO: O onClick que causava o problema foi removido. */}
          {options.map((option) => (
            <Tab key={option.id} label={option.label} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ p: 2 }}>{children}</Box>
    </Box>
  );
}