"use client";

import { AuthContext } from "@/app/guest/layout";
import { getUser } from "@/firebase/controllers/user.conroller";
import { useEffect, useState } from "react";

import { useContext } from "react";
import Categories from "./Categories";
import CollectionList from "./CollectionList";
import Scheduler from "./ScheduleTransactions";
import UpcomingTransactions from "./UpcomingTransactions";
import Activities from "./Activities";
import { allCategories } from "@/firebase/controllers/categories.controller";
import ConcludedTransactions from "./ConcludedTransactions";
import "./styles.css";
import { auth } from "@/firebase";

export default function Dashboard() {
  const context = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState({});

  const [accumulatedExp, setAccumulatedExp] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = () => {
      setLoading(true);
      try {
        console.log(auth.currentUser.uid);

        setCurrentUser(context.user);
        const allocatedExp = context.user.categories.reduce(
          (total, currentValue) => {
            return total + Number(currentValue.amt);
          },
          0
        );
        setAccumulatedExp(allocatedExp);
        setCategories(context.user.categories);
        setLoading(false);
      } catch (error) {
        // console.log(error.message);
        setLoading(false);
      }
    };

    getCurrentUser();
  }, [auth.currentUser]);

  useEffect(() => {
    const getAllCat = async () => {
      if (auth.currentUser) {
        try {
          const c = await allCategories({
            user_id: auth.currentUser.uid,
          });

          if (c instanceof Error) {
            console.log("err", c.message);
          } else {
            console.log("succes-collection-list");
            console.log(c);

            context.setAllCategory(c);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    getAllCat();
  }, [auth.currentUser]);

  return (
    <>
      {loading ? (
        <div className="loader">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="container">
          <h1>Hey there!, {context.user.full_name}</h1>

          <div className="bal">
            <div className="dets">
              <h3>Salary(€): {currentUser.salary}</h3>
              <h3>Total allocation made to exp: {accumulatedExp} </h3>

              {/* <h3>Spent: {0}</h3> */}

              <h3>Bal(€): {currentUser.salary - accumulatedExp}</h3>
            </div>

            <Activities user_id={currentUser.user_id} />
            <Categories
              categories={categories}
              user_id={context.user.user_id}
            />

            <Scheduler user_id={context.user.user_id} />

            <UpcomingTransactions user_id={context.user.user_id} />

            <ConcludedTransactions user_id={context.user.user_id} />
          </div>
        </div>
      )}
    </>
  );
}
