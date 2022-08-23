import React, { Suspense } from "react";
import { MainLayout } from "../layout/index";
import { history } from "../../stores/_helpers/history";
import { Router, Route } from "react-router-dom";
import PropTypes from "prop-types";
import RouteEnum from "../../constants/RouteEnum";
import Toasts from "../components/common/toasts/Toasts";
import { Spin } from "antd";

export const Routes = () => {
  return (
    // this.props.isRequesting
    <Spin spinning={false} tip="Loading..." className="spin-loading">
      <Router history={history}>
        <Suspense
          fallback={<Spin spinning tip="Loading..." className="spin-loading" />}
        >
          <Route path={RouteEnum.Home} render={() => <MainLayout />} />
        </Suspense>
        <Toasts />
      </Router>
    </Spin>
  );
};

Routes.propTypes = {
  isRequesting: PropTypes.bool
};

export { Routes as UnConnectedRoutes };
export default Routes;
