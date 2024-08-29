import React, { useState } from 'react';

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
      <label htmlFor={'technologies'}>
        <span>Technologies</span>

        <div className="tags-container">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        <input
          type={'text'}
          id={'technologies'}
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
