# React List Throttle

Super simple component just throttle a list to reduce rendering cost of long list.


## Installation

```
$ npm i react-list-throttle-component
```

or `yarn add`

## Usage

### Infinite Scroll

```javascript
import ListThrottle from 'react-list-throttle';

// ...

return (
  <ListThrottle items={strs}>
    {({renderPrevItems, renderNextItems, throttledItems}) => (
      <SomeAwesomeComponentSupportsScroll
        superHandlerCatchOnScrollTop={renderPrevItems}
        superHandlerCatchOnScrollEnd={renderNextItems}
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


### Paged List


```javascript
  <ListThrottle items={items} contentsPerPage={contentsPerPage} previousPageBuffer={0}>
    {({page, renderPrevItems, renderPage, renderNextItems, throttledItems}) => (
      <>
        {throttledItems.map(item => (
          <ItemRow key={item.id}>{item}</ItemRow>
        ))}

        <NavigationButton
          page={page}
          max={Math.ceil(sortedItems.length / contentsPerPage)}
          onPrev={renderPrevItems}
          onNext={renderNextItems}
          onPaged={renderPage}
        />
      </>
    )}
  </ListThrottle>
```


## API


```typescript

interface ChildArgument<T> {
  // function to call previous page which is intented to use event handler for kinda `onScrollTop`
  renderPrevItems(): void;
  // function to call next page which is intented to use event handler for kinda `onScrollEnd`
  renderNextItems(): void;
  renderPage(page: number): void;
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
