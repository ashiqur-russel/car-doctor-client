import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import OrderTable from "./OrderTable";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5001/orders?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .then((err) => console.log(err));
  }, [user?.email]);

  const handleDelete = (id) => {
    console.log("Order delete clicked", id);
    const proceed = window.confirm(
      "Are you sure, you want to delete this order"
    );

    if (proceed) {
      fetch(`http://localhost:5001/orders/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("Deleted Successfully");
            const remaining = orders.filter((odr) => odr._id !== id);
            setOrders(remaining);
          }
        })
        .then((err) => console.log(err));
    }
  };
  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full mt-10 mb-10">
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
            <OrderTable
              key={order._id}
              order={order}
              handleDelete={handleDelete}
            ></OrderTable>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
