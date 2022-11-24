import React from 'react';
import Image from 'next/image';
import styles from './Intro.module.scss';

export const Intro = () => {
  return (
    <section className={styles.intro}>
      <div className={styles.intro__content}>
        <div className={styles.intro__left}>
          <h2>
            <Image src='/static/img/baskala-logo.png' width={250} height={82} />
          </h2>
          <h1>читать книгу здесь</h1>
          <h4>Лучшие решения для интернет-маркетинга</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat
            vulputate orci in semper. Aliquam elementum ligula vel magna molestie
            facilisis. Morbi sodales lorem vel lobortis pharetra. Vivamus quis
            aliquet lorem, id tempus sapien. Aliquam at risus accumsan,
            pellentesque enim sit amet, laoreet lorem.
          </p>
          <div className={styles.intro__buttonContainer}>
              <button>Узнать больше</button>
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
