import { createClient } from 'contentful';
import NotFound from './404';
import { useSelector } from "react-redux";
import { languageSelector } from '../store/languageSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from 'react-spinner-animated';
import SwiperCore, { Navigation } from 'swiper';
import "swiper/components/navigation/navigation.min.css";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import Author from '../components/Author/Author';
import styles from './Authors.module.scss';

SwiperCore.use([Navigation]);

export async function getStaticProps() {

    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    })
  
    const res = await client.getEntries({ content_type: "author" })
  
    return {
      props: {
        author: res.items,
      },
      revalidate: 1
    }
  }

export default function Authors({ author }) {
  if (!author) return <NotFound />;

  const curLanguage = useSelector(languageSelector);

  return (
    <div className="page-content">
        <div className={styles.authors__wrapper}>
            <h3 className='label'>
              {curLanguage === "tt" && "Авторлар"}
              {curLanguage === "ru" && "Авторы"}
              {curLanguage === "tt-lt" && "Avtorlar"}</h3>
              <InfiniteScroll
                dataLength={author.length}
                loader={<Spinner width="80px" height="80px" center={false} />}
              >
                <div className={styles.authors__list}>
                  {author.map((a) => <Author key={a.sys.id} author={a} />)}
                </div>
              </InfiniteScroll>
        </div>
    </div>
  )
}