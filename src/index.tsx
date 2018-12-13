import React, {Component, ReactNode} from 'react';

import memoizeOne from 'memoize-one';

function slicedItems<T>(items: ReadonlyArray<T>, page: number, contentsPerPage: number, previousPageBuffer: number): ReadonlyArray<T> {
  const currentHead = page * contentsPerPage;
  return items.slice(Math.max(0, currentHead - contentsPerPage * previousPageBuffer), currentHead + contentsPerPage);
}

const PREVIOUS_PAGE_BUFFER = 2;
const CONTENT_PER_PAGE = 50;

interface State {
  page: number;
}

interface ChildArgument<T> {
  page: number;
  renderPrevCreatives(): void;
  renderNextCreatives(): void;
  renderPage(page: number): void;
  throttledItems: ReadonlyArray<T>;
}

interface Props<T> {
  items: ReadonlyArray<T>;
  previousPageBuffer?: number;
  contentsPerPage?: number;
  children(arg: Partial<ChildArgument<T>>): ReactNode;
}

export default class ListThrottle<T> extends Component<Props<T>, State> {
  static defaultProps = {previousPageBuffer: PREVIOUS_PAGE_BUFFER, contentsPerPage: CONTENT_PER_PAGE};

  state = {page: 0};

  shouldComponentUpdate(nextProps: Props<T>, nextState: State) {
    if (this.state != nextState) {
      return true;
    }

    return this.props.items !== nextProps.items;
  }

  renderPrevCreatives = () => {
    const {page} = this.state;
    if (page > this.props.previousPageBuffer!) {
      this.setState({page: page - 1});
    }
  };

  renderNextCreatives = () => {
    const {page} = this.state;
    if (page * this.props.contentsPerPage! < this.props.items.length) {
      this.setState({page: page + 1});
    }
  };

  renderPage = (page: number) => {
    this.setState({page});
  };

  render() {
    return this.props.children({
      page: this.state.page,
      renderPrevCreatives: this.renderPrevCreatives,
      renderNextCreatives: this.renderNextCreatives,
      renderPage: this.renderPage,
      throttledItems: slicedItems(this.props.items, this.state.page, this.props.contentsPerPage!, this.props.previousPageBuffer!),
    });
  }
}
