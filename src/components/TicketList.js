import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";

// const mainTicketList = [ //props are read-only, can't be changed so use const not let
//   {
//     names: 'Thato and Haley',
//     location: '3A',
//     issue: 'Firebase won\'t save record. Halp.'
//   }, 
//   {
//     names: 'Sleater and Kinney',
//     location: '4B',
//     issue: 'Prop types are throwing an error.'
//   }, 
//   {
//     names: 'Imani & Jacob',
//     location: '9F',
//     issue: 'Child component isn\'t rendering.'
//   }
// ];

function TicketList(props){
  return (
    <React.Fragment>
    <hr />
    {/* loops through our mainTicketList. On each iteration, it creates a new Ticket with props corresponding to one of the tickets in mainTicketList */}
    {Object.values(props.ticketList).map((ticket) => 
      <Ticket 
        whenTicketClicked = { props.onTicketSelection }
        names={ticket.names}
        location={ticket.location}
        issue={ticket.issue}
        formattedWaitTime={ticket.formattedWaitTime}
        id={ticket.id}
        key={ticket.id} />
    )}
    </React.Fragment>
  );
}

TicketList.propTypes = {
  ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func
};

export default TicketList;