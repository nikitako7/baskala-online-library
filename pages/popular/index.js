import React from 'react';
import { createClient } from 'contentful';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from 'react-spinner-animated';
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
  const popularBooks = books.filter((book) => book?.fields?.tags?.includes('Popular'));
    // const curLanguage = useSelector(languageSelector);
    // console.log(books);
    if (!popularBooks.length) return <NotFound />;
  
    return (
        <div className="page-content">
          <div className='book-list'>
            <h3 className='label'> Популярное </h3>
              <InfiniteScroll
                dataLength={popularBooks.length}
                loader={<Spinner width="80px" height="80px" center={false} />}
              >
                <div className="list">
                  {popularBooks.map((book) => <Book key={book.sys.id} book={book} />)}
                </div>
              </InfiniteScroll>
          </div>
      </div>
    )
}