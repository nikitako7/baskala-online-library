import React from 'react';
import { useRouter } from 'next/router'
import { links, options } from '../../utils/index';
import styles from './Modal.module.scss';

export const Modal = ({ closeModal }) => {
  const router = useRouter();

  const onClickHandler = (path) => {
    closeModal(false);
    path && router.push(path);
  };

  return (
    <div className={styles.modal}>
        <nav className={styles.modal__links}>
          <ul>
            {links.map(({ id, title, path }) => (
              <li key={id} onClick={() => onClickHandler(path)}>
                { title }
              </li>
            ))}
          </ul>
          <div className={styles.modal__select}>
            <div>
              {options.map(({ value, label }) => (
                <span key={value}>{ label }</span>
              ))}
            </div>
          </div>
        </nav>
    </div>
  )
}