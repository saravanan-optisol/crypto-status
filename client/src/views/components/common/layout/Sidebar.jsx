import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {  useDispatch } from "react-redux";

const Sidebar = ({ showMenu }) => {
  const dispatch = useDispatch();
  const { push } = useHistory();


  return (
    <React.Fragment>
     <div>Slider</div>
    </React.Fragment>
  );
};

export default Sidebar;
