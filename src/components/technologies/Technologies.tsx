import React, { useState } from 'react';
import styles from './styles.module.scss';

interface Props {
}

const Technologies: React.FC<Props> = () => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      // Prevent form submission
      e.preventDefault();

      setTags([...tags, inputValue.trim()]);

      // Clear the input after adding a tag
      setInputValue('');
    }
  };

  return (
    <div>
      <label htmlFor={'technologies'} className={styles.label}>
        <span>Technologies</span>
        <div className={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <input
          type={'text'}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
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
