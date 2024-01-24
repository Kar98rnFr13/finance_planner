import {
  transactions,
  updateTransaction,
} from "@/firebase/controllers/categories.controller";
import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { dateFormatter } from "@/utils/date-formatter";
import { auth } from "@/firebase";
import { AuthContext } from "@/app/guest/user/dashboard/layout";

export default function UpcomingTransactions({ user_id }) {
  const [trans, setTrans] = useState([]);
  const { allAct } = useContext(AuthContext);

  useEffect(() => {
    if (auth.currentUser) {
      const getUpcomingTransactions = async (cat) => {
        try {
          const result = await transactions(auth.currentUser.uid);

          if (result instanceof Error) {
            console.log("err", c.message);
          } else {
            // const upcoming =

            setTrans(result.upcomingTransactions);
          }
        } catch (error) {
          console.log(error.message);
        }
      };

      getUpcomingTransactions();
    }
  }, [allAct]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date(dateFormatter());

      trans.forEach(async (transaction) => {
        const scheduledDate = new Date(transaction.sch.date);

        if (
          currentDate.getTime() >= scheduledDate.getTime() &&
          !transaction.sch.executed
        ) {
          const sch = transaction.sch;
          sch.executed = true;

          await updateTransaction(
            transaction.id,
            sch,
            user_id,
            transaction.particular
          );
        } else {
          // todo
        }
      });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      {trans.length > 0 && (
        <div className="tran">
          <h2>Upcoming Transactions</h2>

          {trans.map((x) => {
            return (
              <div className="t-box">
                <p>Particular: {x.particular}</p>
                <p>Amt: {x.amt}</p>
                <p>Date: {x.sch.date}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
