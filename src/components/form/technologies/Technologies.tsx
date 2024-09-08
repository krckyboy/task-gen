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
    if (e.key === 'Enter' || e.key === ' ' && inputValue.trim() !== '') {
      // Prevent form submission
      e.preventDefault();

      if (tags.find((tag) => tag === inputValue.trim())) {
        setInputValue('');
        return;
      }

      setTags([...tags, inputValue.trim()]);

      // Clear the input after adding a tag
      setInputValue('');
    }
  };

  const handleBlur = () => {
    if (inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
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
