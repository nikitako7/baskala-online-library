import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import NotFound from '../404';
import styles from './author-slug.module.scss';
import Slider from '../../components/Slider/Slider';

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

  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { author: items[0] },
  }

}

export default function BookDetails({ author }) {
  if (!author) return <NotFound />;

  const { fullName, photo, description } = author.fields;

  return (
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
          <h2 className={styles.book__rightside_title}>{ fullName }</h2>
          <h3 className={styles.book__rightside_descriptionTitle}>About This Author</h3>
          <div className={styles.book__rightside_description}>{documentToReactComponents(description)}</div>
          <Slider />
      </div>
    </div>
    
  )
}