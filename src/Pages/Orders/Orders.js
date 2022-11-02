import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5001/orders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .then((err) => console.log(err));
  }, [user?.email]);
  return (
    <div>
      <h2 className="text-5xl">You have :{orders.length} orders.</h2>
    </div>
  );
};

export default Orders;