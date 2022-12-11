import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import styles from './Book.module.scss';
import { languageSelector } from '../../store/languageSlice';
import { useSelector } from 'react-redux';

export default function Book({ book }) {
  const router = useRouter();
  const curLanguage = useSelector(languageSelector);
  const { title, titleRu, titleTtlt, slug, author, thumbnail, year } = book.fields;
  return (
    <div className={styles.book}>
      <div>
        <Link href={'/books/' + slug}>
          <figure>
            <Image 
              src={'https:' + thumbnail.fields.file.url}
              width={router.pathname === '/search' ? 300 : thumbnail.fields.file.details.image.width}
              height={router.pathname === '/search' ? 450 : thumbnail.fields.file.details.image.height}
            />
          </figure>
        </Link>
      </div>
      <div className={styles.book__content}>
        <h4>
          { curLanguage === 'tt' && title }
          { curLanguage === 'ru' && titleRu }
          { curLanguage === 'tt-lt' && titleTtlt }
        </h4>
        <p>{ author?.fields?.fullName }</p>
        <span>{ year }</span>
      </div> 
    </div>
  )
} 
 