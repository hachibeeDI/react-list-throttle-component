# React List Throttle

Super simple component just throttle a list to reduce rendering cost of long list.


## Installation

```
$ npm i react-list-throttle-component
```

or `yarn add`

## Usage

ListThrottle has no 


```javascript
import ListThrottle from 'react-list-throttle';

// ...

return (
  <ListThrottle items={strs}>
    {({renderPrevCreatives, renderNextCreatives, throttledItems}) => (
      <SomeAwesomeComponentSupportsScroll
        superHandlerCatchOnScrollTop={renderPrevCreatives}
        superHandlerCatchOnScrollEnd={renderNextCreatives}
      >
        <ul>
          {throttledItems.map(str => (
            <li>{str></li>
          ))}
        </ul>
      </SomeAwesomeComponentSupportsScroll>
    )}
  </ListThrottle>
)
```

ListThrottle has no actual DOM but only functionality.
And also, there is no functionality supports handling `onScroll` event. So if you would like to implement a component works like `infinite scroller` you just need to implement the handler by yourself.


## API


```typescript

interface ChildArgument<T> {
  // function to call previous page which is intented to use event handler for kinda `onScrollTop`
  renderPrevCreatives(): void;
  // function to call next page which is intented to use event handler for kinda `onScrollEnd`
  renderNextCreatives(): void;
  throttledItems: ReadonlyArray<T>;
}

interface Props<T> {
  items: ReadonlyArray<T>;
  previousPageBuffer?: number;
  contentsPerPage?: number;
  children(arg: ChildArgument<T>): ReactNode;
}
```


## Licensed

MIT
