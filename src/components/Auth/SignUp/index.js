"use client";

import { useState } from "react";
import "../styles.css";
import { signUpUser } from "@/firebase/controllers/user.conroller";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const formRef = useRef(null);
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [categoriesInputs, setCategoriesInputs] = useState({
    name: "",
    amt: "",
  });

  const handleSingUp = async (e) => {
    e.preventDefault();
    try {
      const data = {
        full_name: e.target.name.value,
        salary: e.target.salary.value,
        email: e.target.email.value,
        categories,
      };

      const pass = e.target.pass.value;
      const user = await signUpUser({ data, pass });

      if (user instanceof Error) {
        console.log(user.message);
      } else {
        formRef.current.reset();
        router.push("/guest/user/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="form-con">
      <form onSubmit={(e) => handleSingUp(e)} ref={formRef}>
        <div className="form-fields">
          <label htmlFor="name">Full name</label>
          <input type="text" name="name" id="name" placeholder="John Doe" />
        </div>
        <div className="form-fields">
          <label htmlFor="email">Email </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="form-fields">
          <label htmlFor="pass">Password </label>
          <input type="text" name="pass" id="pass" placeholder="*****" />
        </div>
        <div className="form-fields">
          <label htmlFor="salary">Monthly Salary:(£) </label>
          <input type="text" name="salary" id="salary" placeholder="200 000" />
        </div>
        <div className="form-fields">
          <p>Add expense categories</p>

          <div className="expense">
            <input
              type="text"
              name="expense-name"
              id="expense-name"
              placeholder="miscellaneous"
              value={categoriesInputs.name}
              onChange={(e) =>
                setCategoriesInputs({
                  ...categoriesInputs,
                  name: e.target.value,
                })
              }
            />
            <input
              type="text"
              name="expense-amt"
              id="expense-amt"
              placeholder="2000"
              onChange={(e) =>
                setCategoriesInputs({
                  ...categoriesInputs,
                  amt: e.target.value,
                })
              }
            />
            <button
              type="button"
              onClick={() => {
                console.log("categories");

                setCategories([...categories, categoriesInputs]);
              }}
            >
              Add
            </button>
          </div>

          <div>
            {categories.length > 0 && (
              <div className="cat">
                {categories.map((cat) => {
                  return (
                    <div>
                      <p>{cat.name}</p>
                      <p>-</p>
                      <p>{cat.amt}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <button type="submit">sign up</button>
      </form>
    </div>
  );
}
