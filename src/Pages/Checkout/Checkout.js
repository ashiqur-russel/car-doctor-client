import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Checkout = () => {
  const services = useLoaderData();
  const { title, price, _id } = services;
  const { user } = useContext(AuthContext);
  const handlePlaceHolder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.first_name.value} ${form.last_name.value}`;
    const email = user?.email || "unregistered";
    const phone = form.phone.value;
    const message = form.message.value;
    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      message,
    };

    console.log(order);
  };
  return (
    <div>
      <form onSubmit={handlePlaceHolder}>
        <h2 className="text-center text-4xl">{title}</h2>
        <h4 className="text-center text-4xl">{price}</h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-10">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="phone"
            placeholder="Your Phone"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
            defaultValue={user?.email}
            readOnly
          />
        </div>

        <textarea
          name="message"
          className="textarea textarea-bordered h-24 w-full"
          placeholder="Type Your Message"
        ></textarea>
        <input className="btn mb-10" type="submit" value="Place your order" />
      </form>
    </div>
  );
};

export default Checkout;
