import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import styles from './Book.module.scss';
import { languageSelector } from '../../store/languageSlice';
import { useSelector } from 'react-redux';
import countapi from 'countapi-js';

export default function Book({ id, book }) {
  const router = useRouter();
  const curLanguage = useSelector(languageSelector);
  const [screen, setScreen] = useState(null);
  const { title, titleRu, titleTtlt, slug, author, thumbnail, featuredImage, year } = book.fields;

  useEffect(() => {
    const timer = setInterval(() => {
      setScreen(window.screen.width)
    }, 2000)

    return () => clearInterval(timer)
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
  
  const image = thumbnail || featuredImage;

  const onClickHandler = () => {
    const book = countapi.info(id)
      .then(res => {
        console.log(res);
        return res.status === 404 ? 
        countapi.create({ key: id, value: 1 })
          .then((result) => console.log(result.value, 'create')
        ) : 
        countapi.hit(id)
          .then(res => console.log(res, 'update'))
      })
      .catch(error => console.log(error, 'error'))
  }

  return (
    <div className={styles.book} id={id} onClick={onClickHandler}>
      <div>
        <Link href={'/books/' + slug}>
          <figure>
            <Image 
              src={'https:' + image.fields.file.url}
              width={screenAndWidthHandler().width || image.fields.file.details.image.width}
              height={screenAndWidthHandler().height || image.fields.file.details.image.height}
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
        <p>
          { curLanguage === 'tt' && author?.fields?.fullName }
          { curLanguage === 'ru' && author?.fields?.fullNameRu }
          { curLanguage === 'tt-lt' && author?.fields?.fullNameTtlt }
        </p>
        <span>{ year }</span>
      </div> 
    </div>
  )
} 
 