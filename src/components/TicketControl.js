import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import EditTicketForm from './EditTicketForm';
import TicketDetail from './TicketDetail';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { formatDistanceToNow } from 'date-fns';
import { ThemeContext } from '../context/theme-context';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // formVisibleOnPage: false, - handled by redux
      selectedTicket: null,
      editing: false
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() => 
    this.updateTicketElapsedWaitTime(),
    60000
    );
  }

  // componentDidUpdate() {
  //   console.log('component updated!');
  // }

  componentWillUnmount() {
    // console.log('component undmounted!');
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.mainTicketList).forEach(ticket => {
      const newFormattedWaitTime = formatDistanceToNow(ticket.timeOpen, {
        addSuffix: true
      });
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    });
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        // formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      // this.setState(prevState => ({
      //   formVisibleOnPage: !prevState.formVisibleOnPage,
      // }));
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteTicket(id);
    dispatch(action);
    this.setState({
      selectedTicket: null
    });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const {id, names, location, issue} = ticketToEdit;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    // const { id, names, location, issue } = newTicket;
    const action = a.addTicket(newTicket);
    dispatch(action);
    // this.setState({formVisibleOnPage: false});
    const action2 = a.toggleForm();
    dispatch(action2);
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  render(){
    let theme = this.context;

    const buttonStyles = {
      backgroundColor: theme.buttonBackground,
      color: theme.textColor,
    }

    let currentlyVisibleState = null;
    let buttonText = null; 
    if (this.state.editing ) {      
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail 
      ticket={this.state.selectedTicket} 
      onClickingDelete={this.handleDeletingTicket}
      onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
      buttonText = "Return to Ticket List"; 
    } else {
      currentlyVisibleState = <TicketList onTicketSelection={this.handleChangingSelectedTicket} ticketList={this.props.mainTicketList} />;
      buttonText = "Add Ticket"; 
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button style={buttonStyles} onClick={this.handleClick}>{buttonText}</button> 
      </React.Fragment>
    );
  }

}

TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    mainTicketList: state.mainTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl.contextType = ThemeContext;
TicketControl = connect(mapStateToProps)(TicketControl);
export default TicketControl;