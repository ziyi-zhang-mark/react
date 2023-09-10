import { useState } from 'react';

// items: [{ label, value, content }]
export const Tabs = ({ defaultSelected, items }) => {
  const [selectedTab, setSelectedTab] = useState(defaultSelected ?? items[0].value);
  return (
    <div className="tabs">
      <div className="tab-list">
        {items.map(({label, value}) => {
          const isSelectedTab = selectedTab === value;
          return (
            <button
              key={value}
              className={`tab-list-item ${isSelectedTab && 'tab-list-item__active'}`}
              onClick={() => {setSelectedTab(value)}}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="content">
        {items.map(({value, content}) => (
          <div key={value} hidden={value !== selectedTab}>
            {content}          
          </div>
        ))}
      </div>
    </div>
  );
}