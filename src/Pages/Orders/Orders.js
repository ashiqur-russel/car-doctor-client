import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import OrderTable from "./OrderTable";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  console.log(orders);
  useEffect(() => {
    fetch(`http://localhost:5001/orders?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .then((err) => console.log(err));
  }, [user?.email]);
  return (
    <div className="overflow-x-auto w-full">
      <h2>Oeders: {orders.length}</h2>

      <table className="table w-full">
        <thead>
          <tr className="">
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Customer Name</th>
            <th>Service</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderTable key={order._id} order={order}></OrderTable>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
