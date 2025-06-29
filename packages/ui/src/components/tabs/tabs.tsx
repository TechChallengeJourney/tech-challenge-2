import { Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';

function CustomTabPanel(props: { children?: React.ReactNode; value: number; index: number }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabOption {
  label: string;
  content: React.ReactNode;
}

interface BytebankTabsProps {
  options: TabOption[];
}

export function BytebankTabs({options}: BytebankTabsProps) {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          borderRadius: '6px',
          overflow: 'hidden',
          border: '1px solid #D4E157',
          display: 'inline-block',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="custom styled tabs"
          TabIndicatorProps={{ style: { display: 'none' } }}
          sx={{
            '& .MuiTab-root': {
              width:`${ 100 / options.length}%`,
              fontWeight: '400',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              color: '#5B6327',
              borderRight: '1px solid #D4E157',
              transition: 'all 0.2s ease-in-out',
            },
            '& .MuiTab-root:last-of-type': {
              borderRight: 'none',
            },
            '& .Mui-selected': {
              backgroundColor: '#D4E157',
              color: '#20240c',
            },
          }}
        >
          {options.map((e,i) => {
            return <Tab key={i} label={e.label} {...a11yProps(i)} />
          })}
        </Tabs>
      </Box>

      {options.map((e, i) => (
        <CustomTabPanel key={i} value={value} index={i}>
          {e.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
