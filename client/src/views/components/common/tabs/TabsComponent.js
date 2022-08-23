import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const TabsComponent = props => {
  return (
    <Tabs selectedIndex={props.selectedIndex} onSelect={props.onSelect}>
      <TabList>
        <Tab>{props.tab1}</Tab>
        {props.tab2 && <Tab>{props.tab2}</Tab>}
        {props.tab3 && <Tab>{props.tab3}</Tab>}
        {props.tab4 && <Tab>{props.tab4}</Tab>}
      </TabList>
      <TabPanel />
      {props.tab2 && <TabPanel />}
      {props.tab3 && <TabPanel />}
      {props.tab4 && <TabPanel />}
    </Tabs>
  );
};

TabsComponent.propTypes = {
  selectedIndex: PropTypes.number,
  onSelect: PropTypes.func,
  tab1: PropTypes.string,
  tab2: PropTypes.string,
  tab3: PropTypes.any,
  tab4: PropTypes.any
};

export default TabsComponent;
