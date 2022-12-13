import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Intro.module.scss';
import { useSelector } from "react-redux";
import { languageSelector } from '../../store/languageSlice';

export const Intro = () => {
  const curLanguage = useSelector(languageSelector);

  return (
    <section className={styles.intro}>
      <div className={styles.intro__content}>
        <div className={styles.intro__left}>
          <h2>
            <Image src='/static/img/baskala-logo.png' width={250} height={82} />
          </h2>
          <h1>
            { curLanguage === 'tt' && 'китапны монда ' }
            { curLanguage === 'ru' && 'ЧИТАТЬ КНИГУ ЗДЕСЬ' }
            { curLanguage === 'tt-lt' && 'read book here' 
          }</h1>
          <h4>
            { curLanguage === 'tt' && 'Иң яхшы Интернет Маркетинг Чишелешләре' }
            { curLanguage === 'ru' && 'Лучшие решения для интернет-маркетинга' }
            { curLanguage === 'tt-lt' && 'Best Internet Marketing Solutions' }</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat
            vulputate orci in semper. Aliquam elementum ligula vel magna molestie
            facilisis. Morbi sodales lorem vel lobortis pharetra. Vivamus quis
            aliquet lorem, id tempus sapien. Aliquam at risus accumsan,
            pellentesque enim sit amet, laoreet lorem.
          </p>
          <div className={styles.intro__buttonContainer}>
              <Link href={'/aboutUs'}>
                <button>
                  { curLanguage === 'tt' && 'Күбрәк белү өчен' }
                  { curLanguage === 'ru' && 'Узнать больше' }
                  { curLanguage === 'tt-lt' && 'Learn more' }
                </button>
              </Link>
          </div>
        </div>
        <div className={styles.intro__right}>
          <figure>
              <Image 
                  src='/static/img/intro.webp' 
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  loading="lazy"
              />
          </figure>
        </div>
      </div>
    </section>
  );
};
