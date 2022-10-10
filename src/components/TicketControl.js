import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TickeList";

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisableOnPage: false
    };
  }

  handleClick = () => {
    this.setState(prevState => ({
      formVisableOnPage: !prevState.formVisableOnPage
    }));
  }

  render() {
    let currentlyVisableState = null;
    let buttonText = null;
    if(this.state.formVisableOnPage) {
      currentlyVisableState = <NewTicketForm />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisableState = <TicketList />
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisableState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default TicketControl;