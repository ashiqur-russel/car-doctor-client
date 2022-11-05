import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import OrderTable from "./OrderTable";

const Orders = () => {
  const { user, logOut } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5001/orders?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("car-service-token")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => {
        setOrders(data);
      })
      .then((err) => console.log(err));
  }, [user?.email, logOut]);

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

  const handleStatusUpdate = (id) => {
    fetch(`http://localhost:5001/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          const remaining = orders.filter((odr) => odr._id !== id);
          const approved = orders.find((odr) => odr._id === id);
          approved.status = "Approved";
          const newOrder = [approved, ...remaining];
          setOrders(newOrder);
        }
      });
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
              handleStatusUpdate={handleStatusUpdate}
            ></OrderTable>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
