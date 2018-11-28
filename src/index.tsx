import React, {Component, ReactNode} from 'react';

const PREVIOUS_PAGE_BUFFER = 2;
const CONTENT_PER_PAGE = 50;

interface State {
  page: number;
}

interface ChildArgument<T> {
  renderPrevCreatives(): void;
  renderNextCreatives(): void;
  throttledItems: ReadonlyArray<T>;
}

interface Props<T> {
  items: ReadonlyArray<T>;
  previousPageBuffer?: number;
  contentsPerPage?: number;
  children(arg: ChildArgument<T>): ReactNode;
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

  // TODO: consider memoization
  slicedItems = (): ReadonlyArray<T> => {
    // cannot be undefined because of defaultProps but TypeScript never know about that
    const contentsPerPage = this.props.contentsPerPage!;
    const previousPageBuffer = this.props.previousPageBuffer!;

    const currentHead = this.state.page * contentsPerPage;
    return this.props.items.slice(Math.max(0, currentHead - contentsPerPage * previousPageBuffer), currentHead + contentsPerPage);
  };

  render() {
    return this.props.children({
      renderPrevCreatives: this.renderPrevCreatives,
      renderNextCreatives: this.renderNextCreatives,
      throttledItems: this.slicedItems(),
    });
  }
}
