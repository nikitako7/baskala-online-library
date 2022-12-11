import React from 'react';
import { useSelector } from "react-redux";
import { createClient } from 'contentful';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from 'react-spinner-animated';
import { languageSelector } from '../../store/languageSlice';
import Book from '../../components/Book/Book';

export async function getStaticProps(params) {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY , 
    });
  
    const res =  await client.getEntries({ content_type: 'book' });
  
    return {
      props: {
        books: res.items,
      }
    }
  }

export default ({ books }) => {
    const curLanguage = useSelector(languageSelector);

    if (!books.length) return <NotFound />;
  
    return (
        <div className="page-content">
          <div className='book-list'>
            <h3 className='label'> Популярное </h3>
              <InfiniteScroll
                dataLength={books.length}
                loader={<Spinner width="80px" height="80px" center={false} />}
              >
                <div className="list">
                  {books.map((book) => <Book key={book.sys.id} book={book} />)}
                </div>
              </InfiniteScroll>
          </div>
      </div>
    )
}