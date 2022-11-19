import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Select from 'react-select';
import styles from './Header.module.scss';
import { links, options, genres } from '../../utils/index';

const genresHeaderAndFooter = {
  width: '100%',
  minHeight: '30px',
  backgroundColor: 'lightgray'
}

export const Header = () => {
  const [activeLink, setActiveLink] = useState({id: '', title: ''});
  const [selectedOption, setSelectedOption] = useState(options[2]);

  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <a>
            <figure>
              <Image src='/../public/images/baskala-logo.png' width={250} height={82}/>
            </figure>
          </a>
        </Link>
        <div className={styles.header__searchBarContainer}>
          <div className={styles.header__searchBar}>
              <Image src='/../public/images/search-icon.svg' width={24} height={24}/>
              <input type="text" title='Searchbar' placeholder='Search by title, author, topic' />
          </div>
        </div>
        <nav className={styles.header__links}>
          <ul>
            {links.map(({id, title}) => (
              <li
                className={activeLink.id === id ? styles.active : ''}
                onClick={() => setActiveLink({id, title})}
                key={id}
              >
                {title}
              </li>
            ))}
          </ul>
        </nav>
        <Select
          className={styles.header__select}
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
      </header>
      {activeLink.title === 'Жанры' && (
        <section className={styles.genres}>
        <div style={genresHeaderAndFooter} />
        <div className={styles.genres__content}>
          {
            genres.map(({id, title, items}) => (
              <div className={styles.genre} key={id}>
                <h4>{title}</h4>
                <div className={styles.genres__items}>
                  {!!items.length && items.map(({id: genreId, genre}) => (
                    <p key={genreId}>{genre}</p>
                  ))}
                </div>
              </div>
            ))
          }
        </div>
        <div style={genresHeaderAndFooter} />
      </section>
      )}
    </>
  )
}