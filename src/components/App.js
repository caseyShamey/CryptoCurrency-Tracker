import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
// import CurrencyDisplay from './CurrencyDisplay/CurrencyDisplay.js';
import Loading from './Loading/Loading';

import token from '../config.js';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      offset: 0,
      elements: [],
      perPage: 9,
      currentPage: 0,
    }

  }

  setElementsForCurrentPage() {
    let elements = this.state.data
                  .slice(this.state.offset, this.state.offset + this.state.perPage)
                  .map(currency => (
                    <div className="currency">
                      <img className="icon" src={currency.logo_url} alt='Logo'/>
                      <p className="name">{currency.name}</p>
                    </div>
                  ));
      this.setState({ elements: elements });
  }

  async componentDidMount() {
    let response = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=${token.TOKEN}`)
    let data = await response.json()
    this.setState({
      loading: false,
      data: data,
      pageCount: Math.ceil(data.length / this.state.perPage),
    }, () => {this.setElementsForCurrentPage()})
  }

  handlePageClick = (data) => {
    const selectedPage = data.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({ currentPage: selectedPage, offset: offset }, () => {
      this.setElementsForCurrentPage();
    });
  }

  render() {
    const { loading, data } = this.state
    let paginationElement;
    if (this.state.pageCount > 1) {
      paginationElement = (
        <ReactPaginate className="reactPaginate"
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={<span className="gap">...</span>}
          pageCount={this.state.pageCount}
          onPageChange={this.handlePageClick}
          forcePage={this.state.currentPage}
          containerClassName={"pagination"}
          previousLinkClassName={"previous_page"}
          nextLinkClassName={"next_page"}
          disabledClassName={"disabled"}
          activeClassName={"active"}
        />
      );
    }
    return (
      <div>
        <Header />
          {loading ? <Loading /> :
            <div>
              <div className="container">
                {this.state.elements}
              </div>
              <div className="pagination">
                {paginationElement}
              </div>
            </div>
          }

        <Footer />
      </div>
    );
  }
}

export default App;
