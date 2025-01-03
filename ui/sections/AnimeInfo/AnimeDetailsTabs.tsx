"use client";

import { Tab, Tabs } from "@mui/material";
import clsx from "clsx";
import React, { useState } from "react";



type tabs = "stream" | "casts"| "recommendations";
type Props = {
    [K in tabs]: React.ReactNode;
  };
type TabPanelProps = {
  children?: React.ReactNode;
  value: tabs;
  id: tabs;
};
const TabPanel = (props: TabPanelProps) => {
  const { children, value,id } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== value}
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
    >
      {id===value&&children}
    </div>
  );
};
function a11yProps(val: string) {
    return {
      id: `simple-tab-${val}`,
      'aria-controls': `simple-tabpanel-${val}`,
    };
  }

export default function AnimeDetailsTabs(props: Props) {
  const [extraTabs, setExtraTabs] = useState<tabs>("stream");
  const handleChange = (event: React.SyntheticEvent, newValue: tabs) => {
    setExtraTabs(newValue);
  };
  const tabs:tabs[] = [
    "stream","casts","recommendations"
  ];
  return (
    <div className="w-full">
      {/* tabs */}
      <div className="w-full sticky top-0 z-10">
        <Tabs
          value={extraTabs}
          onChange={handleChange}
          aria-label="streaming links tabs"
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          className="!bg-white dark:!bg-black !rounded-t-md"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab}
              value={tab}
              label={tab}
              className={clsx("!py-4 !text-lg ", {
                "text-blue-500 dark:!text-blue-300": extraTabs === tab,
                "!text-black dark:!text-white": extraTabs !== tab,
              })}
              {...a11yProps(tab)}
            />
          ))}
        </Tabs>
      </div>

      {
        tabs.map(tab => <TabPanel key={tab} id={tab} value={extraTabs}>
            {props[tab]}
          </TabPanel>)
      }
      
    </div>
  );
}
