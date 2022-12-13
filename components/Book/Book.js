import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import styles from './Book.module.scss';
import { languageSelector } from '../../store/languageSlice';
import { useSelector } from 'react-redux';

export default function Book({ book }) {
  const router = useRouter();
  const curLanguage = useSelector(languageSelector);
  const [screen, setScreen] = useState(null);
  const { title, titleRu, titleTtlt, slug, author, thumbnail, year } = book.fields;

  useEffect(() => {
    setInterval(() => {
      setScreen(window.screen.width)
    }, 2000)
  }, [])

  const screenAndWidthHandler = () => {
    switch (!!router.pathname || !!screen) {
      case router.pathname === '/search':
        return {
          width: 300,
          height: 450
        };
      case screen <= 1080:
        return {
          width: 200,
          height: 300
        };
      default:
        break;
    }

    return false;
  }

  return (
    <div className={styles.book}>
      <div>
        <Link href={'/books/' + slug}>
          <figure>
            <Image 
              src={'https:' + thumbnail.fields.file.url}
              width={screenAndWidthHandler().width || thumbnail.fields.file.details.image.width}
              height={screenAndWidthHandler().height || thumbnail.fields.file.details.image.height}
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
 