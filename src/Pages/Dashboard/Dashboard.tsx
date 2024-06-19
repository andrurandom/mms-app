import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Popup from '../../components/Popup';
import './Dashboard.css';
import axios from 'axios';
import jsCookie from 'js-cookie';

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

const DashboardPage: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [cards, setCards] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api-dev.sparquer.com/indents/userIndents', {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `${jsCookie.get('token')}`,
          },
        });
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const addCard = (data: Data) => {
    setCards([...cards, { ...data, status: null }]);
    setShowPopup(false);
  };

  return (
    <div>
      <Header />
      <div className="subheader">
        <button className="subheader-button" onClick={togglePopup}>Create Indent</button>
        <div className="subheader-search">
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="container" style={{ background: '#E3E4F0', display: 'flex', margin: 'auto 0', overflow: 'hidden' }}>
        <div className="scrollbar" style={{ overflowY: 'auto', paddingRight: '8px' }}>
          <div className="cards-container" style={{ background: '#FFFFFF', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', padding: '16px' }}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              cards.map((card, index) => (
                <Card
                  key={index}
                  item={card}
                  showPopup={false}
                  togglePopup={() => {}}
                  addCard={() => {}}
                  handleStatusButtonClick={() => {}}
                  handleEditButtonClick={(card) => {}}
                  handleDeleteButtonClick={() => {}}
                />
              ))
            )}
          </div>
        </div>
        <div className='side-card'>
          <div className='header-title'>
            <h3>Total Indents Dashboard</h3>
          </div>
          <table>
            <tbody>
              <tr>
                <td className="item-name">Total Indents</td>
                <td className="item-quantity">100</td>
              </tr>
              <tr>
                <td className="item-name">Total Items</td>
                <td className="item-quantity">200</td>
              </tr>
              <tr>
                <td className="item-name">Pending</td>
                <td className="item-quantity">80</td>
              </tr>
              <tr>
                <td className="item-name">Completed</td>
                <td className="item-quantity">20</td>
              </tr>
            </tbody>
          </table>
        </div>
        {showPopup && <Popup onClose={togglePopup} onSubmit={(data: any) => addCard(data)} />}
      </div>
    </div>
  );
};

export default DashboardPage;
