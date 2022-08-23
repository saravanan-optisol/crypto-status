import React, { useState, useEffect, useCallback, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { Spin } from "antd";
import RouteEnum from "../../constants/RouteEnum";
import Navbar from "views/components/common/layout/Navbar";
import { HomepageContainer } from "views/containers/HomepageContainer";

const MainLayout = (props) => {
  
  
  return (
    <Spin spinning={false} tip="Loading..." className="spin-loading">
      <Navbar/>
      <div
        className="Datacontent">
        <Suspense
          fallback={<Spin spinning tip="Loading..." className="spin-loading" />}
        >
          <Switch>
            <Route exact path={RouteEnum.Home} component={HomepageContainer} />
          </Switch>
        </Suspense>
      </div>
    </Spin>
  );
};

MainLayout.defaultProps = {
  children: "",
};

MainLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default MainLayout;
