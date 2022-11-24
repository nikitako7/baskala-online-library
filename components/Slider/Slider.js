import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([Navigation]);

export async function getStaticProps() {
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

export default function Slider() {
    return (
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
    )
  } 