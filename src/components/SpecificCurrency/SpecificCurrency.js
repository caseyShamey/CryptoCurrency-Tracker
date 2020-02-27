import React, { Component } from 'react';

class SpecificCurrency extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    console.log(this.props.currency)
    return (
      <div>
        {JSON.stringify(this.props.currency)}
      </div>
    )
  }

}

export default SpecificCurrency;
