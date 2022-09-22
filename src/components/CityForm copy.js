import React, { Component, useEffect } from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { fetchCity, addCity, updateFormData } from "../asyncCityAction";

const CityForm = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     userId: "",
  //     title: "",
  //     body: "",
  //     posts: [],
  //   };
  // }

  // componentDidMount() {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => {
  //       console.log("****** ", res.data);
  //       this.setState({ posts: res.data });
  //     })
  //     .catch((error) => console.log("*** error:", error));
  // }
  // changeHandler = (e) => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  // submitHandler = (e) => {
  //   e.preventDefault();
  //   console.log("*** state", this.state);
  //   axios
  //     .post("https://jsonplaceholder.typicode.com/posts", this.state)
  //     .then((res) => {
  //       console.log("**** res", res);
  //     })
  //     .catch((error) => console.log("*** error:", error));
  // };

  // const { userId, title, body, posts } = this.state;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCity());
  }, []);
  const Name = "";
  const CountryCode = "";
  const District = "";
  const Population = null;
  const newCity = {
    Name: "test",
    CountryCode: "TTT",
    District: "test dstrict",
    Population: 1000,
  };
  console.log("*** cities", props.cities);
  console.log("*** formData", props.formData);
  const { cities, formData } = props;
  return (
    <>
      {/* <form onSubmit={() => dispatch(addCity(newCity))}> */}
      <div>
        Input fields for new post
        <div>
          <input
            type="text"
            name="Name"
            value={formData && formData.Name}
            onChange={(event) => {
              dispatch(
                updateFormData({
                  targetField: "Name",
                  data: event.target.value,
                })
              );
            }}
          />
        </div>
        <div>
          <input
            type="text"
            name="CountryCode"
            value={formData && CountryCode}
            onChange={(event) => {
              updateFormData({
                targetField: "CountryCode",
                data: event.target.value,
              });
            }}
          />
        </div>
        <div>
          <input
            type="text"
            name="District"
            value={formData && District}
            onChange={(event) => {
              dispatch(
                updateFormData({
                  targetField: "District",
                  data: event.target.value,
                })
              );
            }}
          />
        </div>
        <div>
          <input
            type="number"
            name="Population"
            value={formData && Population}
            onChange={(event) => {
              updateFormData({
                targetField: "Population",
                data: event.target.value,
              });
            }}
          />
        </div>
      </div>
      <button onClick={dispatch(addCity(newCity))}>Submit</button>
      {/* </form> */}
      <div>
        List of posts
        <div>
          {cities &&
            cities.map((city) => (
              <div id={city.ID}>
                {city.ID}: {city.Name}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    formData: state.cities.formData,
    cities: state.cities,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchUsers: () => dispatch(fetchUsers()),
//   };
// };
export default connect(mapStateToProps)(CityForm);
