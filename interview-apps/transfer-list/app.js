import { useState } from "react";
import "./styles.css";

const CheckBoxItem = ({ onChange, label, checked }) => {
  return (
    <div className="transfer-list__section__items__item">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <label>{label}</label>
    </div>
  );
};

const ItemList = ({ items, setItems }) => {
  return (
    <div className="transfer-list__section">
      <ul className="transfer-list__section_items">
        {/* map to array */}
        {Array.from(items).map(([label, checked]) => (
          <li key={label}>
            <CheckBoxItem
              label={label}
              checked={checked}
              onChange={() => {
                const newItems = new Map(items);
                newItems.set(label, !items.get(label));
                setItems(newItems);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const DEFAULT_ITEMS_LEFT = ["HTML", "JavaScript", "CSS", "TypeScript"];
const DEFAULT_ITEMS_RIGHT = ["React", "Angular", "Vue", "Svelte"];
const generateData = (items) => new Map(items.map((label) => [label, false]));
const hasNoSelectedItem = (items) =>
  Array.from(items.values()).every((val) => val === false);

// Transfer all items from a source list to a destination list.
const transferAllItems = (itemsSrc, setItemsSrc, itemsDst, setItemsDst) => {
  setItemsDst(new Map([...itemsDst, ...itemsSrc]));
  setItemsSrc(new Map());
};

// Transfer selected items from a source list to a destination list.
const transferSelectedItems = (
  itemsSrc,
  setItemsSrc,
  itemsDst,
  setItemsDst
) => {
  const newItemsSrc = new Map(itemsSrc);
  const newItemsDst = new Map(itemsDst);
  // forEach((value, key) => {})
  itemsSrc.forEach((checked, label) => {
    if (checked) {
      newItemsDst.set(label, checked);
      newItemsSrc.delete(label);
    }
  });
  setItemsSrc(newItemsSrc);
  setItemsDst(newItemsDst);
};

export default function App() {
  // itemsLeft is a map - { HTML: false, JavaScript: true, ... }
  const [itemsLeft, setItemsLeft] = useState(generateData(DEFAULT_ITEMS_LEFT));
  const [itemsRight, setItemsRight] = useState(
    generateData(DEFAULT_ITEMS_RIGHT)
  );

  return (
    <div className="transfer-list">
      <ItemList items={itemsLeft} setItems={setItemsLeft} />
      <div className="transfer-list__actions">
        <button
          disabled={itemsRight.size === 0}
          onClick={() => {
            transferAllItems(
              itemsRight,
              setItemsRight,
              itemsLeft,
              setItemsLeft
            );
          }}
        >
          <span>&lt;&lt;</span>
        </button>
        <button
          disabled={hasNoSelectedItem(itemsRight)}
          onClick={() => {
            transferSelectedItems(
              itemsRight,
              setItemsRight,
              itemsLeft,
              setItemsLeft
            );
          }}
        >
          <span>&lt;</span>
        </button>
        <button
          disabled={hasNoSelectedItem(itemsLeft)}
          onClick={() => {
            transferSelectedItems(
              itemsLeft,
              setItemsLeft,
              itemsRight,
              setItemsRight
            );
          }}
        >
          <span>&gt;</span>
        </button>
        <button
          disabled={itemsLeft.size === 0}
          onClick={() => {
            transferAllItems(
              itemsLeft,
              setItemsLeft,
              itemsRight,
              setItemsRight
            );
          }}
        >
          <span>&gt;&gt;</span>
        </button>
      </div>
      <ItemList items={itemsRight} setItems={setItemsRight} />
    </div>
  );
}
