import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import NotFound from '../404';
import styles from './book-slug.module.scss';
import { saveAs } from 'file-saver';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({ 
    content_type: "book" 
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
    content_type: 'book',
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
    props: { book: items[0] },
  }

}

export default function BookDetails({ book }) {
  if (!book) return <NotFound />;
console.log(book)
  const { featuredImage, title, author, description, pdfFile, pages, publisher, topic, year, subtopic } = book.fields;

  return (
    <div className={styles.book}>
      <div className={styles.book__leftside}>
        <div className={styles.book__leftside_imageWrapper}>
          <Image 
            src={'https:' + featuredImage.fields.file.url}
            width={featuredImage.fields.file.details.image.width}
            height={featuredImage.fields.file.details.image.height}
            className={styles.book__leftside_image}
          />
        </div>
        <div className={styles.book__leftside_info}>
          <div className={styles.book__leftside_item}>
            <Image 
              src='/../public/images/open-book.png'
              width='24'
              height='24'
              className={styles.book__leftside_icon}
            />
            <span>{pages} pages</span>
          </div>
          <div className={styles.book__leftside_item}>
            <Image 
              src='/../public/images/internet.png'
              width='24'
              height='24'
              className={styles.book__leftside_icon}
            />
            <span>English</span>
          </div>
          <div className={styles.book__leftside_item}>
            <Image 
              src='/../public/images/checked.png'
              width='24'
              height='24'
              className={styles.book__leftside_icon}
            />
            <span>Available on iOS & Android</span>
          </div>
        </div>
      </div>
      <div className={styles.book__rightside}>
          <h2 className={styles.book__rightside_title}>{ title }</h2>
          <h3 className={styles.book__rightside_author}>{ author }</h3>
          <h3 className={styles.book__rightside_descriptionTitle}>About This Book</h3>
          <div className={styles.book__rightside_description}>{documentToReactComponents(description)}</div>
          <button className={styles.book__rightside_button} onClick={() => saveAs('https:' + pdfFile.fields.file.url, title)}>Download PDF</button>
          <h3 className={styles.book__rightside_information}>Information</h3>
          <div className={styles.book__rightside_information}>
            <div className={styles.book__rightside_item}>
              <span className={styles.book__rightside_itemTitle}>Publisher:</span>
              <span className={styles.book__rightside_itemText}>{publisher}</span>
            </div>
            <div className={styles.book__rightside_item}>
              <span className={styles.book__rightside_itemTitle}>Topic:</span>
              <span className={styles.book__rightside_itemText}>{topic}</span>
            </div>
            <div className={styles.book__rightside_item}>
              <span className={styles.book__rightside_itemTitle}>Year:</span>
              <span className={styles.book__rightside_itemText}>{year}</span>
            </div>
            <div className={styles.book__rightside_item}>
              <span className={styles.book__rightside_itemTitle}>Subtopic:</span>
              <span className={styles.book__rightside_itemText}>{subtopic}</span>
            </div>
          </div>
      </div>
    </div>
  )
}