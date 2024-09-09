import React, { useState } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

interface Props {
}

const Technologies: React.FC<Props> = () => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const newValue = inputValue.trim().toLowerCase();

    if ((e.key === 'Enter' || e.key === ' ' || e.key === ',' || e.key === 'Tab') && newValue !== '') {

      if (e.key !== 'Tab') {
        e.preventDefault();
      }

      const newValueWithoutComma = newValue.replace(',', '');

      if (!newValueWithoutComma || newValueWithoutComma.length < 2) {
        setInputValue('');
        return;
      }

      if (tags.find((tag) => tag === newValueWithoutComma)) {
        setInputValue('');
        return;
      }

      setTags([...tags, newValueWithoutComma]);

      // Clear the input after adding a tag
      setInputValue('');
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement | null;

    if (!(relatedTarget instanceof HTMLButtonElement && relatedTarget.type === 'submit')) {
      return;
    }

    if (inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <label htmlFor={'technologies'} className={styles.label}>
        <span>Technologies</span>
        <div className={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <div key={index} className={styles.tag}>
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className={styles.cross}
              >
                <Image alt={'X'}
                       width={14}
                       height={14}
                       src={'/images/cross.svg'}
                /></button>
            </div>
          ))}
        </div>
        <input
          type={'text'}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onBlur={handleBlur}
          value={inputValue}
          placeholder={'Next.js'}
        />
      </label>
      <input
        type="hidden"
        name="technologies"
        value={JSON.stringify(tags)}
      />
    </div>
  );
};

export default Technologies;
