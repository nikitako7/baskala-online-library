import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import NotFound from '../404';
import Book from '../../components/Book/Book';
import { useSelector } from "react-redux";
import { languageSelector } from '../../store/languageSlice';
import styles from './author-slug.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from 'react-spinner-animated';
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
    <div className={styles.container}>
        <div className={styles.author}>
            <div className={styles.author__leftside}>
                <div className={styles.author__leftside_imageWrapper}>
                    <Image 
                        src={'https:' + photo.fields.file.url}
                        width={'260'}
                        height={'390'}
                        className={styles.author__leftside_image}
                    />
                </div>
            </div>
            <div className={styles.author__rightside}>
                <h2 className={styles.author__rightside_title}>
                { curLanguage === 'tt' && fullName }
                { curLanguage === 'ru' && fullNameRu }
                { curLanguage === 'tt-lt' && fullNameTtlt }
                </h2>
                <h3 className={styles.author__rightside_descriptionTitle}>
                  { curLanguage === 'tt' && 'Бу автор турында' }
                  { curLanguage === 'ru' && 'Об авторе' }
                  { curLanguage === 'tt-lt' && 'Bu avtor turynda' }
                </h3>
                <div className={styles.author__rightside_description}>
                  { curLanguage === 'tt' && documentToReactComponents(description) }
                  { curLanguage === 'ru' && documentToReactComponents(descriptionRu) }
                  { curLanguage === 'tt-lt' && documentToReactComponents(descriptionTtlt) }
                </div>
            </div>
        </div>
        <div>
            <div className="">
                <h3 className='label'>
                  { curLanguage === 'tt' && 'Авторнын китаплары' }
                  { curLanguage === 'ru' && 'Книги автора' }
                  { curLanguage === 'tt-lt' && 'Avtornin kitaplari' }
                </h3>
                <InfiniteScroll
                  dataLength={books.length}
                  loader={<Spinner width="80px" height="80px" center={false} />}
                >
                  <div className={styles.books}>
                    {books.map((book) => {
                      if (fullName == book.fields.author.fields.fullName) {
                        return (
                          <div className={styles.wrapper}>
                            <Book key={book.sys.id} book={book} />
                          </div>)
                      }
                      return;
                    })
                    }
                  </div>
              </InfiniteScroll>
            </div>
        </div>
    </div>
  )
}