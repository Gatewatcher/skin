import { Fragment } from 'react';

import { splitStringHalf } from './utils';

import styles from './styles.module.scss';

export type ObfuscatedTextProps = {
  text: string;
};

const ObfuscatedText = ({ text }: ObfuscatedTextProps) => {
  const words = text.split(/(\s+)/);

  return (
    <span>
      {words.map(word => {
        const chunks = splitStringHalf(word);

        return chunks.map((chunk, index) => (
          <Fragment key={index}>
            {chunk}
            <span className={styles.hidden}>
              {Math.random().toString(36).slice(-2)}
            </span>
          </Fragment>
        ));
      })}
    </span>
  );
};

export default ObfuscatedText;
