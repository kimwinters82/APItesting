import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    // create three state variables.
    // apiData is an array to hold our JSON data
    // isFetched indicates if the API call has finished
    // errorMsg is either null (none) or there is some error
    this.state = {
      apiData: [],
      isFetched: false,
      errorMsg: null
    };
  }
  // componentDidMount() is invoked immediately after a
  // component is mounted (inserted into the tree)

  async componentDidMount() {
    try {
      const API_URL = "https://randomuser.me/api/?results=10";
      // Fetch or access the service at the API_URL address
      const response = await fetch(API_URL);
      // wait for the response. When it arrives, store the JSON version
      // of the response in this variable.
      const jsonResult = await response.json();

      // update the state variables correctly.
      this.setState({ apiData: jsonResult.results });
      this.setState({ isFetched: true });
    } catch (error) {
      // In the case of an error ...
      this.setState({ isFetched: false });
      // This will be used to display error message.
      this.setState({ errorMsg: error });
    } // end of try catch
  } // end of componentDidMount()

  // Remember our three state variables.
  // PAY ATTENTION to the JSON returned. We need to be able to
  // access specific properties from the JSON returned.
  // Notice that this time we have three possible returns for our
  // render. This is conditional rendering based on some conditions
  render() {
    if (this.state.errorMsg) {
      return (
        <div className="error">
          <h1>We're very sorry: An error has occured in the API call</h1>

          <p>The error message is: {this.state.errorMsg.toString()}</p>
        </div>
      ); // end of return.
    } else if (this.state.isFetched === false) {
      return (
        <div className="fetching">
          <h1>We are loading your API request........</h1>
          <p>Your data will be here very soon....</p>
        </div>
      ); // end of return
    } else {
      // we have no errors and we have data
      return (
        <div className="App">
          <div className="StocksTable">
            <h1>CS385 - Stocks API Display</h1>
            <table border="1">
              <thead>
                <tr>
                  <th>HeaderCol</th>
                </tr>
              </thead>
              <tbody>
                {this.state.apiData.map((s) => (
                  <tr key={s.login.uuid}>
                    <td>
                      {s.name.first} {s.name.last}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ); // end of return
    } // end of the else statement.
  } // end of render()
} // end of App class
export default App;
