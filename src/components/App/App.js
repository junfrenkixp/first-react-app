import React, {Component} from 'react';
import Header from '../Header/Header';
import SearchPanel from '../SearchPanel/SearchPanel';
import PostStatusFilter from '../PostStatusFilter/PostStatusFilter';
import PostList from '../PostList/PostList';
import PostAddForm from '../PostAddForm/PostAddForm';
import nextId from "react-id-generator";
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {label: 'Going to learn React', important: true, like: false, id: nextId()},
        {label: 'That is so good', important: false, like: false, id: nextId()},
        {label: 'I need a break...', important: false, like: false, id: nextId()}
      ],
      term: '',
      filter: 'all'
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLiked = this.onToggleLiked.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFolterSelect = this.onFolterSelect.bind(this);
  }

  deleteItem(id) {
    this.setState(({data}) => {
      const index = data.findIndex(el => el.id === id);
      const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

      return {
        data: newArr
      }
    })
  }

  addItem(body) {
    const newItem = {
      label: body,
      important: false,
      id: nextId()
    }

    this.setState(({data}) => {
      const newArr = [...data, newItem];
      return {
        data: newArr
      }
    })
  }

  onToggleImportant(id) {
    this.setState(({data}) => {
      const index = data.findIndex(el => el.id === id);
      const oldElem = data[index];
      const newElem = {...oldElem, important: !oldElem.important};
      const newArr = [...data.slice(0, index), newElem, ...data.slice(index + 1)];
      return {
        data: newArr
      }
    })
  }

  onToggleLiked(id) {
    this.setState(({data}) => {
      const index = data.findIndex(el => el.id === id);
      const oldElem = data[index];
      const newElem = {...oldElem, like: !oldElem.like};
      const newArr = [...data.slice(0, index), newElem, ...data.slice(index + 1)];
      return {
        data: newArr
      }
    })
  }

  searchPost(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.label.indexOf(term) > -1;
    })
  }

  filterPost(items, filter) {
    if (filter === 'like') {
      return items.filter(item => item.like)
    } else {
      return items
    }
  }

  onUpdateSearch(term) {
    this.setState({term})
  }

  onFolterSelect(filter) {
    this.setState({filter})
  }

  render() {
    const {data, term, filter} = this.state;
    const liked = data.filter(item => item.like).length;
    const allPosts = data.length;

    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

    return (
      <div className="app">
        <Header 
          liked={liked}
          allPosts={allPosts}/>
        <div className="search-panel d-flex">
          <SearchPanel 
           onUpdateSearch={this.onUpdateSearch}/>
          <PostStatusFilter 
            filter={filter}
            onFilterSelect={this.onFolterSelect}/>
        </div>
        <PostList 
          posts={visiblePosts} 
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}/>
        <PostAddForm 
          onAdd={this.addItem}/>
      </div>
    )
  }
}