import '../styles/Card.css';
import React, { useState } from 'react';
import Popup from './Popup'; // Assuming Popup component exists

interface Item {
  name: string;
  quantity: number;
}

interface CardProps {
  item: {
    items: Item[];
    description: string;
    status: string| null;
    createdAt:string;
  };
  showPopup: boolean;
  togglePopup: () => void;
  addCard: () => void;
  handleStatusButtonClick: () => void;
  handleEditButtonClick: (item: Item[]) => void;
  handleDeleteButtonClick: () => void;
}
interface Item {
  name: string;
  quantity: number;
}

interface Data {
  items: Item[];
  description: string;
  status: string | null;
  createdAt: string;
}

const Card: React.FC<CardProps> = ({
  item,
  showPopup,
  togglePopup,
  addCard,
  handleStatusButtonClick,
  handleEditButtonClick,
  handleDeleteButtonClick,
}) => {

  const [showPopupEdit, setShowPopupEdit] = useState<boolean>(false);
  const [cards, setCards] = useState<Data[]>();

  const togglePopupEdit = () => {
    setShowPopupEdit(!showPopupEdit);
  };

  const editCard = (data: Data) => {
    setCards([{ ...data }]);
    setShowPopupEdit(false);
  };

  const handleEditButtonClick_ = (data: Data) => {
    editCard(data);
  }

  return (
    <div className="card">
      <div className="card-header">
      </div>
      <div className="indent-items">
        <table>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#111a48' }}>Name of the Items</th>
              <th style={{ backgroundColor: '#111a48' }}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {item.items.map((item, index) => (
              <tr key={index}>
                <td className="item-name">{item.name}</td>
                <td className="item-quantity">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-header">
        <div className="indent-description">   
          <p><strong>Description:</strong> {item.description}</p>
        </div>
      </div>
      <div className="card-header">
        <h5>Police Station:</h5>
      </div>
      <div className="indent-police-station">
        {/* Add your police station content here */}
        <h5>created at: {item.createdAt}</h5>
      </div>
      <div className="card-header">
        <h5>Status: {item.status || 'None'}</h5>
      </div>
      <div className="indent-status">
        {showPopup && <Popup onClose={togglePopup} onSubmit={addCard} />}
        {item.status === null && <button onClick={handleStatusButtonClick}>Submit</button>}
        {item.status === null && <button onClick={() => handleEditButtonClick(item.items)}>Edit</button>}
        {item.status === null && <button onClick={handleDeleteButtonClick}>Delete</button>}
      </div>
    </div>
  );
};

export default Card;
