import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import WarningPopup from './WarningPopup';
import '../styles/Popup.css';

interface Item {
  name: string;
  quantity: string;
}

interface Props {
  onClose: () => void;
  onSubmit: (data: { items: Item[]; description: string }) => void;
}

function Popup({ onClose, onSubmit }: Props) {
  const [items, setItems] = useState<Item[]>([
    { name: '', quantity: '' }
  ]);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ [key: number]: string }>({});
  const [pendingItems, setPendingItems] = useState<{ [name: string]: number }>({});
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [warning, setWarning] = useState<string | null>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const indentData = {
        user_id: '9e6016ac-77fb-435b-966f-4a3e7815ccfd',
        description,
        items: items.map(item => ({ name: item.name, quantity: parseInt(item.quantity) }))
      };

      try {
        const response = await axios.post('https://api-dev.sparquer.com/user/indents', indentData);
        console.log('Response:', response.data);
        onSubmit({
          items: items.map(item => ({ ...item, quantity: item.quantity.toString() })),
          description,
        });
        onClose();
      } catch (error) {
        console.error('Error submitting indent:', error);
      }
    }
  };

  const handleChange = async (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setItems(updatedItems);

    if (name === 'name') {
      try {
        let isPending = true;
        let pendingCount = 0;
        if (isPending) {
          if (pendingCount >= 2) {
            setWarning(`You can't add this item. It has been pending twice already.`);
            setCurrentItemIndex(index);
          } else {
            setWarning(`This item is pending already in the other indent. Do you still want to add it?`);
            setCurrentItemIndex(index);
          }
        } else {
          setWarning(null);
        }
        setSuggestions(suggestions);
      } catch (error) {
        console.error('Error checking item status or fetching suggestions:', error);
      }
    }
  };

  const addItem = () => {
    if (items.length < 5) {
      setItems([...items, { name: '', quantity: '' }]);
    }
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: number]: string } = {};
    items.forEach((item, index) => {
      if (!item.name.trim() || !item.quantity.trim()) {
        valid = false;
        newErrors[index] = 'Required';
      }
    });
    setErrors(newErrors);
    return valid;
  };

  const handleWarningClose = () => {
    setWarning(null);
    if (currentItemIndex !== null) {
      const updatedItems = [...items];
      updatedItems.splice(currentItemIndex, 1);
      setItems(updatedItems);
      setCurrentItemIndex(null);
    }
  };

  const handleWarningConfirm = () => {
    setWarning(null);
    setCurrentItemIndex(null);
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <div className="item-inputs">
            {items.map((item, index) => (
              <div key={index} className="item">
                <input
                  type="text"
                  placeholder="Item Name"
                  name="name"
                  value={item.name}
                  onChange={(e) => handleChange(index, e)}
                  className={errors[index] ? 'error-input' : ''}
                />
                <input
                  type="number"
                  placeholder="Qty"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleChange(index, e)}
                  className={`quantity-input ${errors[index] ? 'error-input' : ''}`}
                />
                {errors[index] && <span className="error">{errors[index]}</span>}
                <button type="button" className="remove-btn" onClick={() => removeItem(index)}>
                  &#128465;
                </button>
                {index === items.length - 1 && (
                  <>
                    <ul className="suggestions">
                      {suggestions.map((suggestion, i) => (
                        <li key={i} onClick={() => {
                          const updatedItems = [...items];
                          updatedItems[index].name = suggestion;
                          setItems(updatedItems);
                          setSuggestions([]);
                          setWarning(null);
                        }}>{suggestion}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
          <button type="button" className="subheader-button" onClick={addItem}>Add Item</button>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="button-group">
            <button type="submit" className="subheader-button">Submit</button>
          </div>
        </form>
        {warning && (
          <WarningPopup
            message={warning}
            onClose={handleWarningClose}
            onConfirm={handleWarningConfirm}
          />
        )}
      </div>
    </div>
  );
}

export default Popup;
