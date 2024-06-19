import React, { useState } from 'react';
import Header from '../../components/Header';
import './Store.css';

interface Item {
  name: string;
  quantity: number;
}

interface Data {
  items: Item[];
}

const generateRandomData = (): Data[] => {
  return [
    {
      items: [{ name: "Roses", quantity: 5 }],
    },
    {
      items: [
        { name: "Laptop", quantity: 8 },
        { name: "Headphones", quantity: 1 }
      ],
    },
    {
      items: [
        { name: "Coffee Maker", quantity: 3 },
        { name: "Tea Set", quantity: 2 }
      ],
    }
  ];
};

const StorePage: React.FC = () => {
  const [items, setItems] = useState<Data[]>(generateRandomData());
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemQuantity, setNewItemQuantity] = useState<number>(0);

  const handleAddItem = () => {
    const newItem: Item = {
      name: newItemName,
      quantity: newItemQuantity
    };
    setItems([...items, { items: [newItem] }]);
    setNewItemName("");
    setNewItemQuantity(0);
  };

  const handleRemove = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div>
      <Header />
      <div className="container-store">
        <div className="header-title">
          <h3>Store Inventory</h3>
        </div>
        <table className="items-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((data, index) => (
              data.items.map((item, idx) => (
                <tr key={`${index}-${idx}`}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={() => handleRemove(index)}>Remove</button>
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
        <div className="add-item-form">
          <h3>Add New Item</h3>
          <input
            type="text"
            placeholder="Item Name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newItemQuantity}
            onChange={(e) => setNewItemQuantity(Number(e.target.value))}
          />
          <button onClick={handleAddItem}>Add Item</button>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
