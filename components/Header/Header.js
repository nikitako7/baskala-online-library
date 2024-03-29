import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux";
import styles from './Header.module.scss';
import { links, options } from '../../utils/index';
import { bookSelector, setFilters } from '../../store/appSlice';
import { Modal } from '../Modal/Modal';
import { languageSelector, setLanguage } from '../../store/languageSlice';

export const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState({id: '', title: ''});
  const [search, setSearch] = useState('');
  const books = useSelector(bookSelector);
  const curLanguage = useSelector(languageSelector);

  const bookFilter = (str, strFirstPart, strSecondPart) => ( 
    str?.toLowerCase() === search.toLowerCase() || 
    strFirstPart?.toLowerCase() === search.toLowerCase() ||
    strSecondPart?.toLowerCase() === search.toLowerCase()
  )

  const bookTopicFilter = (str) => str.includes(search.toLowerCase());

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const copyBooks = [...books];
    const findByTitle = copyBooks.filter(({ fields: { title, titleRu, titleTtlt } }) => {
      const [firstPart, secondPart] = title.split(' ');
      const [firstPartRu, secondPartRU] = titleRu.split(' ');
      const [firstPartTtlt, secondPartTtlt] = titleTtlt.split(' ');

      return (
        bookFilter(title, firstPart, secondPart) || 
        bookFilter(titleRu, firstPartRu, secondPartRU) ||
        bookFilter(titleTtlt, firstPartTtlt, secondPartTtlt)
      )
    });
    const findByAuthor = copyBooks.find(
      ({ fields: { author: { fields: { fullName, fullNameRu, fullNameTtlt }}}}) => {
        const [name, fullname] = fullName.split(' ');
        const [nameRu, fullnameRU] = fullNameRu.split(' ');
        const [nameTtlt, fullnameTtlt] = fullNameTtlt.split(' ');

        return (
          bookFilter(fullName, name, fullname) ||
          bookFilter(fullNameRu, nameRu, fullnameRU) ||
          bookFilter(fullNameTtlt, nameTtlt, fullnameTtlt)
        )
      });
    const findByTopic = copyBooks.filter(({ fields: { topic, topicRu, topicTtlt } }) => {
      const topicName = topic.toLowerCase().split(' ');
      const topicNameRu = topicRu.toLowerCase().split(' ');
      const topicNameTtlt = topicTtlt.toLowerCase().split(' ');

      return bookTopicFilter(topicName) || bookTopicFilter(topicNameRu) || bookTopicFilter(topicNameTtlt)
    });

    if (search.trim() && findByTitle.length) {
      dispatch(setFilters([...findByTitle]));
      router.push('/search');
    }

    if (search.trim() && findByAuthor) {
      router.push(`/authors/${findByAuthor.fields.author.fields.slug}`);
    }

    if (search.trim() && findByTopic.length) {
      dispatch(setFilters([...findByTopic]));
      router.push('/search');
    }

    if (!findByTitle.length && !findByAuthor && !findByTopic.length) {
      console.log('404');
      router.push('/404');
    }

    setSearch('');
  }

  const onClickHandler = (id, title, titleRu, titleTtlt, path) => {
    const curTitle = (curLanguage === 'tt' && title) || (curLanguage === 'ru' && titleRu) || (curLanguage === 'tt-lt' && titleTtlt);
    setActiveLink({id, curTitle});
    if (path) router.push(path);
  }

  const reset = () => {
    setActiveLink({id: '', title: ''})
    setOpen(false);
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__content}>
          <Link href="/">
            <a>
              <figure className={styles.header__logo} onClick={() => reset()}>
                <img src='/static/img/baskala-logo.png' />
              </figure>
            </a>
          </Link>
          <div className={styles.header__searchBarContainer}>
            <form className={styles.header__searchBar} onSubmit={onSubmitHandler}>
                <img src='/static/img/search-icon.svg' />
                <input 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)} 
                  type="text" 
                  title='Searchbar' 
                  placeholder={(curLanguage === 'tt' && 'Китапны исеме, авторы, темасы буенча эзләү') || (curLanguage === 'ru' && 'Искать книгу по названию, автору, теме') || (curLanguage === 'tt-lt' && 'Kitapnı iseme, avtorı, teması buyınça ezläw')}
                />
            </form>
          </div>
          <nav className={styles.header__links}>
            <ul>
              {links.map(({id, title, titleRu, titleTtlt, path}) => (
                <li
                  className={activeLink.id === id ? styles.active : ''}
                  onClick={() => onClickHandler(id, title, titleRu, titleTtlt, path)}
                  key={id}
                >
                  {(curLanguage === 'tt' && title) || (curLanguage === 'ru' && titleRu) || (curLanguage === 'tt-lt' && titleTtlt)}
                </li>
              ))}
            </ul>
            <div className={styles.header__select}>
              <select name="languages" id="languages" onChange={(e) => {
                return dispatch(setLanguage(e.target.value));
            }}>
                {options.map(({value, label}) => (
                  <option key={value} value={label}>{label}</option>
                ))}
              </select>
            </div>
          </nav>
          <figure className={styles.header__burgerMenu}>
            { !open ? 
                <Image 
                  src='/static/img/hamburgerMenu.svg' 
                  width={30} height={30} 
                  onClick={() => setOpen(true)}
                /> : 
                <Image src='/static/img/closeButton.svg' 
                  width={30} height={30} 
                  onClick={() => setOpen(false)}
                />
            }
          </figure>
        </div>
      </header>
      { open && <Modal closeModal={setOpen} setActiveLink={setActiveLink} /> }
    </>
  )
}