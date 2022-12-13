import React from 'react';
import { useRouter } from 'next/router'
import { links, options } from '../../utils/index';
import styles from './Modal.module.scss';
import { languageSelector, setLanguage } from '../../store/languageSlice';
import { useDispatch, useSelector } from "react-redux";

export const Modal = ({ closeModal }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const curLanguage = useSelector(languageSelector);

  const onClickHandler = (path) => {
    const curTitle = (curLanguage === 'tt' && title) || (curLanguage === 'ru' && titleRu) || (curLanguage === 'tt-lt' && titleTtlt);
    setActiveLink({id, curTitle});
    closeModal(false);
    path && router.push(path);
  };

  return (
    <div className={styles.modal}>
        <h4 className={styles.modal__title}>{ (curLanguage === 'tt' && 'Телне сайлагыз') || (curLanguage === 'ru' && 'Выбрать язык') || (curLanguage === 'tt-lt' && 'Select Language') }</h4>
        <nav className={styles.modal__links}>
          <ul>
            {links.map(({ id, title, titleRu, titleTtlt, path }) => (
              <li key={id} onClick={() => onClickHandler(path)}>
                { (curLanguage === 'tt' && title) || (curLanguage === 'ru' && titleRu) || (curLanguage === 'tt-lt' && titleTtlt) }
              </li>
            ))}
          </ul>
          <div className={styles.modal__select}>
            <div>
              {options.map(({ value, label }) => (
                <button className={styles.btn} key={value} value={label} onClick={(e) => {
                  return dispatch(setLanguage(e.target.value));
              }}>{ label }</button>
              ))}
            </div>
          </div>
        </nav>
    </div>
  )
}