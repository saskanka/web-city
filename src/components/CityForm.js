import React, { Component, useEffect } from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { fetchCity, addCity, updateFormData } from "../asyncCityAction";

class CityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      CountryCode: "",
      District: "",
      Population: undefined,
      cities: [],
    };
  }

  componentDidMount() {
    const { fetchCity } = this.props;
    fetchCity();
  }
  changeHandler = (e) => {
    console.log("*** e", e.target);
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const { addCity } = this.props;
    console.log("*** this.state", this.state);
    const { Name, CountryCode, District, Population } = this.state;
    console.log("*** Name", Name);
    addCity({ Name, CountryCode, District, Population });
  };

  render() {
    const { cities } = this.props;
    const { Name, CountryCode, District, Population } = this.props;
    console.log("*** cities", cities);
    return (
      <>
        <form onSubmit={this.submitHandler}>
          <div>
            Input fields for new post
            <div>
              <input
                type="text"
                name="Name"
                value={Name}
                onChange={this.changeHandler}
              />
            </div>
            <div>
              <input
                type="text"
                name="CountryCode"
                value={CountryCode}
                onChange={this.changeHandler}
              />
            </div>
            <div>
              <input
                type="text"
                name="District"
                value={District}
                onChange={this.changeHandler}
              />
            </div>
            <div>
              <input
                type="number"
                name="Population"
                value={Population}
                onChange={this.changeHandler}
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
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
  }
}

const mapStateToProps = (state) => {
  return {
    cities: state.cityStore.cities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCity: (payload) => dispatch(addCity(payload)),
    fetchCity: () => dispatch(fetchCity()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CityForm);
