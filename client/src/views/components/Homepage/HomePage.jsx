import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from 'react-bootstrap'
import CryptoAction from "stores/crypto/CryptoAction";
import io from 'socket.io-client';
import environment from "environment";

const HomePage = () => {
  const [lastUpdate, setLastUpdate] = useState(null);
  const coinRecord = useSelector((store) => store.crypto.coins?.result);
  let count = 1;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CryptoAction.getTopCryptos());
  }, [lastUpdate]);

  useEffect(() => {
    const socket = io(environment.socketUrl, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "crypto"
      }
    });  
    socket.on('connection');
    
    socket.on('coinsUpdate', (updated_at) => {
      setLastUpdate(updated_at);
    })
  }, []);
  return (
    <div>
      <Table striped responsive className="manage-records-table border-0">
          <thead>
            <tr className="font-Avenir-Bold">
                <th
                >#</th>
                <th
                >Name</th>
                <th
                >Price</th>
                <th
                >24h %</th>
                <th
                >7d %</th>
                <th
                >Market Cap</th>
                <th
                >Volume(24h)</th>
                <th
                >Circulating Supply</th>
            </tr>
          </thead>
          <tbody>
            {coinRecord?.record?.length > 0 ? (
              coinRecord?.record?.map((item, index) => (
                <tr key={index} className="font-Avenir-Regular">
                  <td
                    className="table-row">{count++}</td>
                  <td
                  className="table-row"
                  >
                    <img
                      className="image-rounded" 
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png">
                    </img>
                    <span
                    className="heading-name">{item.name}</span>
                  </td>

                  <td
                  className="table-row">
                    {item.price}
                  </td>
                  <td
                  className="table-row">
                    {item.percent_change_24h}
                  </td>

                  <td
                  className="table-row">
                    {item.percent_change_7d}
                  </td>
                  <td>
                    {item.market_cap}
                  </td>

                  <td
                  className="table-row">
                    {item.volume_24h}
                  </td>
                  <td
                  className="table-row">
                    {item.circulating_supply}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center no-record">
                  <p> No Record Found</p>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
    </div>
  );
};

export default HomePage;
