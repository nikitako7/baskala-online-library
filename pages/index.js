import React, { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from 'react-spinner-animated';
import { useDispatch, useSelector } from "react-redux";
import { filterSelector } from '../store/appSlice';
import { languageSelector } from '../store/languageSlice';
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
  const [screen, setScreen] = useState(null);
  const dispatch = useDispatch();
  const filteredBooks = useSelector(filterSelector);
  
  const curLanguage = useSelector(languageSelector);

  useEffect(() => {
    dispatch(setBooks([...books]));
  })

  useEffect(() => {
    setInterval(() => {
      setScreen(window.screen.width)
    }, 2000)
  }, [])

  const slidesPerViewHandler = () => {
    switch (!!screen) {
      case screen >= 1440:
        return 5;
      case screen >= 768:
        return 3;
      case screen >= 350:
        return 2;
      default:
        break;
    }
  }
  
  return (
    <>
      <Intro />
      <div className="page-content">
        <div className="book-list">
          <h3 className='label'>
            { curLanguage === 'tt' && 'Иң популяр' }
            { curLanguage === 'ru' && 'Самые популярные' }
            { curLanguage === 'tt-lt' && 'İñ populyar' }
          </h3>
          { !!books.length ? (
            <Swiper
            className='list'
            spaceBetween={ screen >= 1080 ? 50 : 100}
            slidesPerView={slidesPerViewHandler()}
            navigation={true}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {books.map((book) => (
              <SwiperSlide key={book.sys.id}>
                <Book book={book} />
              </SwiperSlide>))}
          </Swiper>
          ) : <Spinner width="80px" height="80px" center={false} />}
        </div>
      </div>
      <div className="page-content">
          <div className='book-list'>
            <h3 className='label'>
            { curLanguage === 'tt' && 'Иң соңгы өстәлгән' }
            { curLanguage === 'ru' && 'Последние добавленные' }
            { curLanguage === 'tt-lt' && 'İñ soñğı östälgän' }
            </h3>
              <InfiniteScroll
                dataLength={books.length}
                loader={<Spinner width="80px" height="80px" center={false} />}
              >
                <div className="list">
                  {books.map((book) => <Book key={book.sys.id} id={book.sys.id} book={book} />)}
                </div>
              </InfiniteScroll>
          </div>
      </div>
    </>
  )
} 