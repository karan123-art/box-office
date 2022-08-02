import React from "react";
import { useLocation } from "react-router-dom";

import { NavList,LinkStyled } from "./Navs.styled";

const LINKS=[
    {to:"/",text:"home"},
    {to:"/starred",text:"starred"}
]

const Nav =()=>{
    const location=useLocation();
    return(
        <div>
            <NavList>
               { LINKS.map(item => (
                     <li><LinkStyled to={item.to} className={item.to===location.pathname ? 'active':''}>{item.text}</LinkStyled></li>
                 ) )}
            </NavList>
        </div>

    );
}
export default Nav;