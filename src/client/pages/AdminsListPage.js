import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAdmins } from "../actions";
import requireAuth from "../components/hoc/requireAuth";

export class adminsList extends Component {
  componentDidMount() {
    this.props.fetchAdmins();
  }

  renderUsers() {
    return this.props.adminsList.map(user => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  render() {
    return (
      <div>
        <h3>List of admins</h3>
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    adminsList: state.admins
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchUsers: () => dispatch(fetchUsers())
//   };
// };

// const loadData = store => {
//   return store.dispatch(fetchAdmins());
// };

// export { loadData };

export default {
  // loadData,
  loadData: ({ dispatch }) => dispatch(fetchAdmins()),
  component: connect(
    mapStateToProps,
    // mapDispatchToProps
    { fetchAdmins }
  )(requireAuth(adminsList))
};
