import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
import SpecificCurrency from './SpecificCurrency/SpecificCurrency.js';
import Loading from './Loading/Loading';
import Paginate from './Pagination/Pagination.js';

import token from '../config.js';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      generalView: true,
      loading: true,
      offset: 0,
      elements: [],
      perPage: 9,
      currentPage: 0,
      selectedCurrency: undefined,
    }

    this.renderCurrency = this.renderCurrency.bind(this);
    this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
  }

  setElementsForCurrentPage() {
    let elements = this.state.data
                  .slice(this.state.offset, this.state.offset + this.state.perPage)
                  .map((currency, i) => (
                    <div className="currency" onClick={() => this.handleCurrencyClick((i + this.state.offset))} key={i + this.state.offset}>
                      <img className="icon" src={currency.logo_url} alt='Logo'/>
                      <p className="name">{currency.name}</p>
                    </div>
                  ));
      this.setState({
        elements: elements,
      });
  }

  handleCurrencyClick = (id) => {
    this.setState({
      generalView: !this.state.generalView,
      selectedCurrency: id,
    });
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

    this.setState({
      currentPage: selectedPage,
      offset: offset,
    }, () => {
      this.setElementsForCurrentPage();
    });
  }

  renderCurrency = () => {
    let paginationElement;
    if (!this.state.generalView) {
      return (
        <div>
          <Header name={this.state.data[this.state.selectedCurrency].name}/>
          <SpecificCurrency currency={this.state.data[this.state.selectedCurrency]}/>
        </div>
      )
    }
    if (this.state.pageCount > 1 && this.state.generalView) {
      window.scrollTo(0, 0)
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
        <div>
          <Header name="CryptoCurrency Tracker" />
        </div>
        <div className="container">
          {this.state.elements}
        </div>
        {paginationElement}
      </div>
    )
  }

  render() {
    const { loading, data } = this.state
    return (
      <div>
        {/* <Header name="CryptoCurrency Tracker"/> */}
          {loading ? <Loading /> :
            <div>
              {this.renderCurrency()}
            </div>
          }

        <Footer />
      </div>
    );
  }
}

export default App;
