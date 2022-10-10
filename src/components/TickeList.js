import React from "react";
import Ticket from "./Ticket";

const mainTicketList = [ //props are read-only, can't be changed so use const not let
  {
    names: 'Thato and Haley',
    location: '3A',
    issue: 'Firebase won\'t save record. Halp.'
  }, 
  {
    names: 'Sleater and Kinney',
    location: '4B',
    issue: 'Prop types are throwing an error.'
  }, 
  {
    names: 'Imani & Jacob',
    location: '9F',
    issue: 'Child component isn\'t rendering.'
  }
];

function TicketList(){
  return (
    <React.Fragment>
    <hr />
    {/* loops through our mainTicketList. On each iteration, it creates a new Ticket with props corresponding to one of the tickets in mainTicketList */}
    {mainTicketList.map((ticket, index) => 
      <Ticket names={ticket.names}
        location={ticket.location}
        issue={ticket.issue}
        key={index}/>
    )}
    </React.Fragment>
  );
}

export default TicketList;