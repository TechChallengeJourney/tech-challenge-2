import { Box, Tab, Tabs } from "@mui/material";
import { useTheme } from "@repo/utils";
import { useEffect, useState } from "react";

interface TabOption {
  label: string;
  id: string;
}

interface BytebankTabsProps {
  options: TabOption[];
  onChangeTab?: (id: string) => void;
  children: React.ReactNode;
}

export function BytebankTabs({
  options,
  onChangeTab,
  children,
}: BytebankTabsProps) {
  const [value, setValue] = useState(0);
  const {colors} = useTheme();

  useEffect(() => {
    if (options?.[value]) {
      onChangeTab?.(options[value].id);
    }
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);

    const newTabId = options[newValue].id;

    onChangeTab?.(newTabId);
  };
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          borderRadius: "6px",
          overflow: "hidden",
          border: `1px solid ${colors["lime.500"]}`,
          display: "inline-block",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="custom styled tabs"
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            minHeight: "42px",
            '[class*="MuiButtonBase-root-MuiTab-root"]': {
              padding: "12px",
              minHeight: "42px",
            },
            "& .MuiTab-root": {
              width: `${100 / options.length}%`,
              fontWeight: "400",
              fontSize: "0.875rem",
              textTransform: "uppercase",
              color: colors["lime.highcontrast"],
              borderRight: `1px solid ${colors["lime.500"]}`,
              transition: "all 0.2s ease-in-out",
            },
            "& .MuiTab-root:last-of-type": {
              borderRight: "none",
            },
            "& .Mui-selected": {
              backgroundColor: colors["lime.500"],
              color: colors["lime.subcontrast"] ,
            },
          }}
        >
          {options.map((option) => (
            <Tab key={option.id} label={option.label} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ px: 1 }}>{children}</Box>
    </Box>
  );
}
