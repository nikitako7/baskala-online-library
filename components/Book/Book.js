import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import styles from './Book.module.scss';

export default function Book({ book }) {
  const { title, slug, author, thumbnail, year } = book.fields;
  const router = useRouter();
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
        <h4>{ title }</h4>
        <p>{ author?.fields?.fullName }</p>
        <span>{ year }</span>
      </div> 
    </div>
  )
} 
 