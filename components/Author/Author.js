import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import styles from '../Book/Book.module.scss';
import { languageSelector } from '../../store/languageSlice';
import { useSelector } from 'react-redux';

export default function Author({ author }) {
  const router = useRouter();
  const curLanguage = useSelector(languageSelector);
  const [screen, setScreen] = useState(null);
  const { fullName, fullNameRu, fullNameTtlt, photo, slug } = author.fields;

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
        <Link href={'/authors/' + slug}>
          <figure>
            <Image 
              src={'https:' + photo.fields.file.url}
              width={screenAndWidthHandler().width || '216'}
              height={screenAndWidthHandler().height || '320'}
            />
          </figure>
        </Link>
      </div>
      <div className={styles.book__content}>
        <h4>
          { curLanguage === 'tt' && fullName }
          { curLanguage === 'ru' && fullNameRu }
          { curLanguage === 'tt-lt' && fullNameTtlt }
        </h4>
      </div> 
    </div>
  )
} 
 