import React, { useEffect } from 'react';
import { createClient } from 'contentful';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from 'react-spinner-animated';
import { useDispatch } from "react-redux";
import { Intro } from '../components/Intro/Intro';
import Book from '../components/Book/Book';
import { setBooks } from '../store/appSlice';
import "swiper/components/navigation/navigation.min.css";
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'react-spinner-animated/dist/index.css';

SwiperCore.use([Navigation]);

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

export default function Books({ books }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBooks([...books]));
  })
  
  return (
    <>
      <Intro />
      <div className="page-content">
        <div className="book-list">
          <h3 className='label'>Самые популярные</h3>
          <Swiper
            className='list'
            spaceBetween={50}
            slidesPerView={5}
            navigation={true}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {books.map((book) => (
              <SwiperSlide key={book.sys.id}>
                <Book book={book} />
              </SwiperSlide>))}
          </Swiper>
        </div>
      </div>
      <div className="page-content">
          <div className='book-list'>
            <h3 className='label'>Последние добавленные</h3>
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
    </>
  )
} 