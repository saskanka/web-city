import React, { useEffect, Component } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import store, { fetchUsers } from "../asyncSubscribersActions";

import axios from "axios";

const SubscriberForm = (props) => {
  const dispatch = useDispatch();
  // let users;
  // useEffect(() => {
  //   users = store.getState().users;
  //   return null;
  // });
  // const a = useSelector((state) => state.store.getState());
  // const { users } = store.getState();
  // console.log("*** subscribers", props.users);
  // console.log("*** store.getState()", store.getState());
  //   const { subscribers } = useSelector((state) => {
  //   console.log("***", state);
  //   return state.store;
  // });
  return (
    <>
      <div>
        List of subscribers
        <div>
          {props.users &&
            props.users.map((item) => (
              <div key={item._id}>
                {item._id}: {item.name} Channel: {item.channel}
              </div>
            ))}
        </div>
        <button onClick={props.fetchUsers}>Get subscribers</button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log("*** state", state);
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SubscriberForm);
