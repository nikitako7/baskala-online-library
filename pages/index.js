import { createClient } from 'contentful';
import { Intro } from '../components/Intro/Intro';
import Book from '../components/Book';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

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
  return (
    <>
      <Intro />
      <div className="page-content">
        <div className="book-list">
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            loop
            pagination={{ clickable: true }}
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
    </>
  )
} 