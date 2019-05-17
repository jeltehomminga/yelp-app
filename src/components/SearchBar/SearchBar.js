import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      location: "",
      sortBy: "best_match"
    };
    this.sortByOptions = {
      "Best Match": "best_match",
      "Highest Rated": "rating",
      "Most Reviewed": "review_count"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  getSortByClass(sortByOption) {
    return this.state.sortBy === sortByOption ? "active" : "";
  }
  handleSortByChange(sortByOption) {
    this.setState({ sortBy: sortByOption });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSearch() {
    this.props.searchYelp(
      this.state.term,
      this.state.location,
      this.state.sortBy
    );
  }
  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (
        <li
          key={sortByOptionValue}
          className={this.getSortByClass(sortByOptionValue)}
          onClick={() => this.handleSortByChange(sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  }
  render() {
    return (
      <div className='SearchBar'>
        <div className='SearchBar-sort-options'>
          <ul>{this.renderSortByOptions()}</ul>
        </div>
        <div className='SearchBar-fields'>
          <input
            type='text'
            onChange={this.handleChange}
            name='term'
            placeholder={"Search Businesses"}
          />
          <input
            type='text'
            onChange={this.handleChange}
            name='location'
            placeholder={"Where?"}
          />
        </div>
        <div className='SearchBar-submit'>
          <a href='./#' onClick={e => this.handleSearch(e)}>
            Let's Go!
          </a>
        </div>
      </div>
    );
  }
}

export default SearchBar;
