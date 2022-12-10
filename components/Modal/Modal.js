import React from 'react';
import { links, options } from '../../utils/index';
import styles from './Modal.module.scss';

export const Modal = () => {
  return (
    <div className={styles.modal}>
        <nav className={styles.modal__links}>
          <ul>
            {links.map(({ id, title }) => (
              <li key={id}>
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