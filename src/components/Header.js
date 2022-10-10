import React from "react";
import ticketImg from "./../img/ticket.jpg";

function Header() {
  return (
    <React.Fragment>
    <h1>Help Queue</h1>
    <img src={ticketImg} alt='an image of a ticket' />
    </React.Fragment>
  );
}

export default Header;