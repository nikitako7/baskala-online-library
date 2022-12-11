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
import i18n from "i18next";
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi )
  .init({
    supportedLngs: ['ru', 'tt', 'tt-lt'],
    fallbackLng: "ru",
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie']
    },

    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json'
    },

    react: {
      useSuspense: false 
    }
  });

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

  console.log(books.filter((book) => !!book?.fields?.tags?.length));
  
  return (
    <>
      <Intro />
      <div className="page-content">
        <div className="book-list">
          <h3 className='label'>
            { curLanguage === 'tt' && 'Иң популяр' }
            { curLanguage === 'ru' && 'Самые популярные' }
            { curLanguage === 'tt-lt' && 'Most popular' }
          </h3>
          { !!books.length ? (
            <Swiper
            className='list'
            spaceBetween={50}
            slidesPerView={screen <= 767 ? 1 : 5}
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
            { curLanguage === 'tt' && 'Cоңгы өстәлде' }
            { curLanguage === 'ru' && 'Последние добавленные' }
            { curLanguage === 'tt-lt' && 'Last added' }
            </h3>
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