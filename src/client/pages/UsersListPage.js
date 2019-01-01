import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";

export class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.usersList.map(user => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  render() {
    return (
      <div>
        <h1>List of users</h1>
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    usersList: state.users
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchUsers: () => dispatch(fetchUsers())
//   };
// };

const loadData = store => {
  return store.dispatch(fetchUsers());
};

// export { loadData };

export default {
  loadData,
  component: connect(
    mapStateToProps,
    // mapDispatchToProps
    { fetchUsers }
  )(UsersList)
};
