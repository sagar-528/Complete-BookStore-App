import React, { Component } from 'react'
import './Pagination.scss'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

export class Pagination extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pager: {},
      initialPage: 1,
    }

  if (this.props.items && this.props.items.length) {
    this.setPage(this.state.initialPage);
  }

}

componentDidUpdate(prevProps, prevState) {
  // reset page if items array has changed
  if (this.props.items !== prevProps.items) {
      this.setPage(this.state.initialPage);
  }
  console.log('this',this.state.initialPage);
  
}

  setPage(page) {
    var items = this.props.items;
    var pager = this.state.pager;
    if (page < 1 || page > pager.totalPages) {
        return;
    }

    // get new pager object for specified page
    pager = this.getPager(items.length, page);

    // get new page of items from items array
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({
        pager: pager
    });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
}

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 8;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}

  render() {

    var pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
        // don't display pager if there is only 1 page
        return null;
    }

    return (
      <div>
         <IconButton color="primary" component="span">
              <KeyboardArrowLeftIcon onClick={() => this.setPage(pager.currentPage - 1)} />
            </IconButton>
            {pager.pages.map((page) =>
              <Button color="black"onClick={() => this.setPage(page)}>{page}</Button>
            )}
            <IconButton color="primary" component="span" style={{ border: '2px' }}>
              <KeyboardArrowRightIcon onClick={() => this.setPage(pager.currentPage + 1)}/>
            </IconButton>
      </div>
    )
  }
}

export default Pagination
