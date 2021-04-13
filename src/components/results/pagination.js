import PropTypes from 'prop-types';
import React from "react";
import cx from "classnames";
import {DoubleChevronLeft, ChevronLeft, ChevronRight, DoubleChevronRight} from "../icons/chevrons";

class FederatedPagination extends React.Component {

  onPageChange(page, pageAmt) {
    if (page >= pageAmt || page < 0) { return; }
    this.props.onChange(page);

    if(document.getElementById("stat") != null) {
      document.getElementById("stat").focus({preventScroll: false});
    }
  }

  buildHandleEnterKeyPress = (onClick) => ({ key }) => {
    if (key === 'Enter') {
      onClick();
    }
  };

  renderPage(page, currentPage, key) {
    let isCurrentPage = page === currentPage;
    return (
      <li className={cx("pagination__control", (isCurrentPage ? 'is-active' : 'not-active'))} key={key}>
        <button className={cx("pagination__control-button pagination__control-button--number")} tabIndex="0" onClick={this.onPageChange.bind(this, page)} onKeyPress={this.buildHandleEnterKeyPress(this.onPageChange.bind(this, page))} title={isCurrentPage ? "Current page" : `Go to page ${page + 1}`} aria-current={isCurrentPage ? page + 1 : undefined}>
          <span className="screen-hide">Page</span>{page + 1}
        </button>
      </li>
    );
  }

  render() {
    const { query, results } = this.props;
    const { start, rows } = query;
    const { numFound } = results;
    const pageAmt = Math.ceil(numFound / rows);
    const currentPage = start / rows;
    const numButtons = this.props.options.paginationButtons || 5;

    let rangeStart = currentPage - 2 < 0 ? 0 : currentPage - 2;
    let rangeEnd = rangeStart + numButtons > pageAmt ? pageAmt : rangeStart + numButtons;

    if (rangeEnd - rangeStart < numButtons && rangeStart > 0) {
      rangeStart = rangeEnd - numButtons;
      if (rangeStart < 0) { rangeStart = 0; }
    }

    let pages = [];
    for (let page = rangeStart; page < rangeEnd; page++) {
      if (pages.indexOf(page) < 0) {
        pages.push(page);
      }
    }

    let firstPageHidden = (currentPage === 0);
    let prevPageHidden = (currentPage - 1 < 0);
    let nextPageHidden = (currentPage + 1 >= pageAmt);
    let lastPageHidden = (pageAmt === 0 || currentPage === pageAmt - 1);

    return (
      <nav className="pagination" role="navigation" aria-labelledby="pagination__heading">
        <h4 id="pagination__heading">Pagination</h4>
        <ul className="pagination__controls">
          <li className={cx("pagination__control pagination__control--first", {"screen-hide": firstPageHidden})} key="start">
            <button className={cx("pagination__control-button pagination__control-button--first")} tabIndex={firstPageHidden ? "-1" : "0"} onClick={this.onPageChange.bind(this, 0)} onKeyPress={ this.buildHandleEnterKeyPress(this.onPageChange.bind(this, 0)) } title="Go to first page">
              <span className="screen-hide">First page</span>
              <span aria-hidden={firstPageHidden ? "true" : "false"}>
                <DoubleChevronLeft/>
              </span>
            </button>
          </li>
          <li className={cx("pagination__control search-pager__item--previous", {"screen-hide": prevPageHidden})} key="prev">
            <button className={cx("pagination__control-button pagination__control-button--prev")} tabIndex={prevPageHidden ? "-1" : "0"} onClick={this.onPageChange.bind(this, currentPage - 1)} onKeyPress={ this.buildHandleEnterKeyPress(this.onPageChange.bind(this, currentPage - 1)) }title="Go to previous page" rel="previous">
              <span className="screen-hide">Previous page</span>
              <span aria-hidden={prevPageHidden  ? "true" : "false"}>
                <ChevronLeft/>
              </span>
            </button>
          </li>
          {pages.map((page, idx) => this.renderPage(page, currentPage, idx))}
          <li className={cx("pagination__control pagination__control--next", {"screen-hide": nextPageHidden})} key="next">
            <button className={cx("pagination__control-button pagination__control-button--next")} tabIndex={nextPageHidden ? "-1" : "0"} onClick={this.onPageChange.bind(this, currentPage + 1, pageAmt)} onKeyPress={ this.buildHandleEnterKeyPress(this.onPageChange.bind(this, currentPage + 1, pageAmt)) } title="Go to next page" rel="next">
              <span className="screen-hide">Next page</span>
              <span aria-hidden={nextPageHidden ? "true" : "false"}>
                <ChevronRight/>
              </span>
            </button>
          </li>
          <li className={cx("pagination__control search-pager__item--last", {"screen-hide": lastPageHidden})} key="end">
            <button className={cx("pagination__control-button pagination__control-button--last")} tabIndex={lastPageHidden ? "-1" : "0"} onClick={this.onPageChange.bind(this, pageAmt - 1)} onKeyPress={ this.buildHandleEnterKeyPress(this.onPageChange.bind(this, pageAmt - 1)) } title="Go to last page">
              <span className="screen-hide">Last page</span>
              <span aria-hidden={lastPageHidden ? "true" : "false"}>
                <DoubleChevronRight/>
              </span>
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

FederatedPagination.propTypes = {
  onChange: PropTypes.func,
  query: PropTypes.object,
  results: PropTypes.object
};

export default FederatedPagination;
