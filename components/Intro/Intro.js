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
            { curLanguage === 'tt' && 'Татар әдәбияте китапханәсе' }
            { curLanguage === 'ru' && 'Библиотека татарской литературы' }
            { curLanguage === 'tt-lt' && 'TATAR ÄDÄBİYATI KİTAPXANÄSE' }
          </h1>
          <h4>
            { curLanguage === 'tt' && 'Başqala белән татар язычуларының әсәрләрен өйрәник!' }
            { curLanguage === 'ru' && 'Изучайте произведения татарских писателей вместе с Başqala!' }
            { curLanguage === 'tt-lt' && 'Başqala belän tatar yazıçularınıñ äsärlären öyränik!' }</h4>
          <p>
            { curLanguage === 'tt' && 'Başqala проекты — ул онлайн татар әдәбияте китапханәсе. Сайтта татар язычуларының Һәм шагыйрьләрнең әдәби әсәрләре, шулай ук, татар теленә тәрҗемә ителгән бөтендөнья әдәбияте классикасы җыелган. Başqala белән милли мәдәнияткә чумып алыгыз әле!' }
            { curLanguage === 'ru' && 'Проект Başqala - это онлайн библиотека татарской литературы. На сайте собраны произведения татарских писателей и поэтов, а также классика мировой литературы, переведенная на татарский язык. Погрузитесь в национальную культуру вместе с Başqala!' }
            { curLanguage === 'tt-lt' && '”Başqala” proyektı — ul onlayn tatar ädäbiyatı kitapxanäse. Saytta tatar yazıçularınıñ da şağireneñ ädäbi äsärläre cıyılğan häm tatar telenä tärcemä itelgän bötendönya ädäbiyatı klassikası şulay uq. “Başqala” belän milli mädäniyätkä çumıp alığız äle!' }
          </p>
          <div className={styles.intro__buttonContainer}>
              <Link href={'/aboutUs'}>
                <button>
                  { curLanguage === 'tt' && 'Безнең турында' }
                  { curLanguage === 'ru' && 'О нас' }
                  { curLanguage === 'tt-lt' && 'Bezneñ turında' }
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
