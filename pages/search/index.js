import React from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Book from '../../components/Book/Book';
import { filterSelector } from '../../store/appSlice';
import NotFound from '../404';
import { Spinner } from 'react-spinner-animated';

export default () => {
  const filteredBooks = useSelector(filterSelector);

  if (!filteredBooks.length) return <NotFound />;

  return (
    <div className="page-content">
      { !!filteredBooks.length && (
      <div className='book-list'>
        { filteredBooks.length > 4 ? (
          <InfiniteScroll
            dataLength={filteredBooks.length}
            loader={<Spinner width="80px" height="80px" center={false} />}
          >
            <div className="list">
              {filteredBooks.map((book) => <Book key={book.sys.id} book={book} />)}
            </div>
          </InfiniteScroll>
        ) : (
          <div className="list-filtered">
            {filteredBooks.map((book) => <Book key={book.sys.id} book={book} />)}
          </div>
        )}
      </div>
      )}
    </div>
  )
}
