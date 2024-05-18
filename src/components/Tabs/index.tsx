import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ height: '100%' }}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export interface TabNodeI {
  name: string;
  component: React.ReactNode;
}

interface TabsContainerI {
  tabsContainerName: string;
  tabs: TabNodeI[];
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  value: number;
}

export default function TabsContainer({
  tabs,
  tabsContainerName,
  value,
  handleChange
}: TabsContainerI) {
  return (
    <Box sx={{ width: '100%', height: '80%' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          justifyContent: 'space-between'
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label={tabsContainerName}>
          {tabs.map((tab) => (
            <Tab key={tab.name} label={`${tab.name}`} sx={{ width: '50%' }} {...a11yProps(0)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tabContent, index) => (
        <CustomTabPanel key={tabContent.name + 'content'} value={value} index={index}>
          {tabContent.component}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
