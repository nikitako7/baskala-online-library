import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import NotFound from '../404';
import Book from '../../components/Book/Book';
import { useSelector } from "react-redux";
import { languageSelector } from '../../store/languageSlice';
import styles from './author-slug.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import "swiper/components/navigation/navigation.min.css";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

SwiperCore.use([Navigation]);

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({ 
    content_type: "author" 
  })

  const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'author',
    'fields.slug': params.slug
  });

  const res =  await client.getEntries({ content_type: 'book' });

  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { author: items[0], books: res.items },
  }

}

export default function BookDetails({ author, books }) {
  if (!author) return <NotFound />;

  const curLanguage = useSelector(languageSelector);

  const { fullName, fullNameRu, fullNameTtlt, photo, description, descriptionRu, descriptionTtlt } = author.fields;

  return (
    <>
        <div className={styles.book}>
            <div className={styles.book__leftside}>
                <div className={styles.book__leftside_imageWrapper}>
                    <Image 
                        src={'https:' + photo.fields.file.url}
                        width={photo.fields.file.details.image.width}
                        height={photo.fields.file.details.image.height}
                        className={styles.book__leftside_image}
                    />
                </div>
            </div>
            <div className={styles.book__rightside}>
                <h2 className={styles.book__rightside_title}>
                { curLanguage === 'tt' && fullName }
                { curLanguage === 'ru' && fullNameRu }
                { curLanguage === 'tt-lt' && fullNameTtlt }
                </h2>
                <h3 className={styles.book__rightside_descriptionTitle}>About This Author</h3>
                <div className={styles.book__rightside_description}>
                  { curLanguage === 'tt' && documentToReactComponents(description) }
                  { curLanguage === 'ru' && documentToReactComponents(descriptionRu) }
                  { curLanguage === 'tt-lt' && documentToReactComponents(descriptionTtlt) }
                </div>
            </div>
        </div>
        <div className="page-content">
            <div className="book-list">
                <h3 className='label'>Книги автора</h3>
                <Swiper
                className='list'
                spaceBetween={50}
                slidesPerView={5}
                navigation={true}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                >
                {books.map((book) => {
                    if (fullName == book.fields.author.fields.fullName) {
                        return (
                            <SwiperSlide key={book.fields.title}>
                              <Book book={book} />
                            </SwiperSlide>
                          )
                    }
                    return;
                })}
                </Swiper>
            </div>
        </div>
    </>
  )
}