import { useState } from 'react';

export default function Accordion({ sections }) {

  const [openSections, setOpenSections] = useState(new Set());

  return (
    <div className='accordion'>
      {sections.map(({ value, title, content }) => {
        const isExpended = openSections.has(value);

        const setIconClassName = () => {
          const classNames = ['accordion-icon'];
          if (isExpended) {
            classNames.push('accordion-icon--rotated');
          }
          return classNames.join(' ')
        }
        return (
          <div key={value} className='accordion-item'>
            <button
              className='accordion-item-title'
              onClick={() => {
                const newOpenSections = new Set(openSections);
                newOpenSections.has(value) 
                  ? newOpenSections.delete(value) 
                  : newOpenSections.add(value);
                setOpenSections(newOpenSections);
              }}>
              {title}
              <span
                aria-hidden={true}
                className={setIconClassName()}
              />
            </button>
            <div className="accordion-item-content">
              {isExpended && content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
