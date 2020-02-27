import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import SpecificCurrency from '../SpecificCurrency/SpecificCurrency';

import './Pagination.css'

class Pagination extends Component {
  constructor(props) {
    super(props)

    this.state = {
      offset: 0,
      elements: [],
      perPage: 9,
      currentPage: 0,
    }
  }

  handlePageClick = (data) => {
    const selectedPage = data.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      generalView: true,
      currentPage: selectedPage,
      offset: offset,
    }, () => {
      this.setElementsForCurrentPage();
    });
  }

  render() {
    let paginationElement;
    if (!this.state.generalView) {
      return (
        <SpecificCurrency/>
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
        <div className="container">
          {this.state.elements}
        </div>
        {paginationElement}
      </div>
    )
  }

}

export default Pagination;