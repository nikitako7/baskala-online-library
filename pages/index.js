import { createClient } from 'contentful';
import { Intro } from '../components/Intro/Intro';
import Book from '../components/Book/Book';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import InfiniteScroll from 'react-infinite-scroll-component';
import "swiper/components/navigation/navigation.min.css";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

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

const fetchData = async() => {
  const client = createClient({
    space: '39onfl0s0lfd',
    accessToken: 'r_HUD_W7ZBqxlPVoKRaXr3Z2eV1wkzFyDhkF3cbulFU', 
  });

  const res =  await client.getEntries({ content_type: 'book' });

  return {
    books: res.items,
  }
}

export default function Books({ books }) {
  return (
    <>
      <Intro />
      <div className="page-content">
        <div className="book-list">
          <h3 className='label'>Самыми популярные</h3>
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
                next={fetchData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
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