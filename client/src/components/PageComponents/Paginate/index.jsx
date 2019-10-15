import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

let prev = 0;
let next = 0;
let last = 0;
let first = 0;

const Page = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: fit-content;
  height: 100%;
  margin-left: 100px;
  width: 100%;
`;

class Paginate extends Component {
  constructor() {
    super();
    this.state = {
      todos: null,
      currentPage: 1,
      todosPerPage: 10
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleLastClick = this.handleLastClick.bind(this);
    this.handleFirstClick = this.handleFirstClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: Number(event.target.id)
    });

    window.scroll(0, 0);
  }

  handleLastClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: last
    });
  }

  handleFirstClick(event) {
    event.preventDefault();
    this.setState({
      currentPage: 1
    });
  }

  render() {
    const { currentPage, todosPerPage } = this.state;
    const todos = this.props.todos;

    // Logic for displaying todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    // Logic for previous and next pages of todos
    prev = currentPage > 0 ? currentPage - 1 : 0;
    last = Math.ceil(todos.length / todosPerPage);
    next = last === currentPage ? currentPage : currentPage + 1;

    // Logic for displaying page numbers
    let pageNumbers = [];
    for (let i = 1; i <= last; i++) {
      pageNumbers.push(i);
    }

    return (
      <Page>
        <div>
          <ul Style="list-style-type: none;">
            {currentTodos.map((todo, index) => {
              return <li key={index}>{todo}</li>;
            })}
          </ul>
          <ul id="page-numbers">
            <nav>
              <Pagination>
                <PaginationItem>
                  {prev === 0 ? (
                    <PaginationLink disabled>First</PaginationLink>
                  ) : (
                    <PaginationLink
                      onClick={this.handleFirstClick}
                      id={prev}
                      href={prev}
                    >
                      First
                    </PaginationLink>
                  )}
                </PaginationItem>

                <PaginationItem>
                  {prev === 0 ? (
                    <PaginationLink disabled>Prev</PaginationLink>
                  ) : (
                    <PaginationLink
                      onClick={this.handleClick}
                      id={prev}
                      href={prev}
                    >
                      Prev
                    </PaginationLink>
                  )}
                </PaginationItem>

                {pageNumbers.map((number, i) => (
                  <Pagination key={i}>
                    <PaginationItem
                      active={
                        pageNumbers[currentPage - 1] === number ? true : false
                      }
                    >
                      <PaginationLink
                        onClick={this.handleClick}
                        href={number}
                        key={number}
                        id={number}
                      >
                        {number}
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                ))}

                <PaginationItem>
                  {currentPage === last ? (
                    <PaginationLink disabled>Next</PaginationLink>
                  ) : (
                    <PaginationLink
                      onClick={this.handleClick}
                      id={pageNumbers[currentPage]}
                      href={pageNumbers[currentPage]}
                    >
                      Next
                    </PaginationLink>
                  )}
                </PaginationItem>

                <PaginationItem>
                  {currentPage === last ? (
                    <PaginationLink disabled>Last</PaginationLink>
                  ) : (
                    <PaginationLink
                      onClick={this.handleLastClick}
                      id={pageNumbers[currentPage]}
                      href={pageNumbers[currentPage]}
                    >
                      Last
                    </PaginationLink>
                  )}
                </PaginationItem>
              </Pagination>
            </nav>
          </ul>
        </div>
      </Page>
    );
  }
}

Paginate.propTypes = {
  todos: PropTypes.object,
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default Paginate;
