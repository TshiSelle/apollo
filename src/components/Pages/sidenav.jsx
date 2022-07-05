import React from "react";
import "./sidenav.css";
import { useState } from "react";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';
import Content from './content';

function Sidenav() {
  const [open,setOpen] = useState(false);
  const [test,setTest] = useState("First text");

  return (
    <div class="sidenav">
      <div className="sidenav__button" style={{display: open ? 'none' : '' }}>
        <MenuOpenIcon onClick={() => setOpen(true)} />
      </div>
      <div  className="sidenav__container" style={{display: open ? '' : 'none' }}>
        <CloseIcon className="sidenav__close"  onClick={() => setOpen(false)} />
        <a  onClick={() => setTest("Variables in javascript")}>variables in javascript</a>
        <a onClick={() => setTest("asdada in javascript")}>asdasd</a>
        <a>sdfmsasd</a>
        <a>asdasd</a>
        <a>sdfmsasd</a>
        <a>asdasd</a>
        <a>sdfmsasd</a>
        <a>asdasd</a>
        <a>sdfmsasd</a>
        <a>asdasd</a>
        <a>sdfmsasd</a>
        <a>asdasd</a>
        <a>sdfmsasd</a>
        <a>asdasd</a>
        <a>variables in javascript</a>
        <a>asdasd</a>
        <a>sdfmsasd</a>
        <a>asdasd</a>
        <a>sdfmsasd</a>
        <a>asdasd</a>
        <a>sdfmsasd</a>
        <a>asdasd</a>
        <a>sdfmsasd</a>
        <a>asdasd</a>
        <a>sdfmsasd</a>
        <a>asdasd</a>
        <a>sdfmsasd</a>
        <a>asdasd</a>
      </div>
        <Content name={test}  />
      
    </div>
  );
}

export default Sidenav;
