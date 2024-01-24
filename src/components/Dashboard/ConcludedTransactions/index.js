import { AuthContext } from "@/app/guest/user/dashboard/layout";
import { dateFormatter } from "@/utils/date-formatter";
import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { transactions } from "@/firebase/controllers/categories.controller";
import { auth } from "@/firebase";

export default function ConcludedTransactions({ user_id }) {
  const { allAct } = useContext(AuthContext);

  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      const getConcludedTransactions = async () => {
        try {
          const result = await transactions(auth.currentUser.uid);

          if (result instanceof Error) {
            console.log(result.message);
          } else {
            setCompleted(result.concludedTransactions);
          }
        } catch (error) {
          console.log(error.message);
        }
      };

      getConcludedTransactions();
    }
  }, [allAct]);

  return (
    <>
      {completed.length > 0 && (
        <div className="concluded">
          <h2>Concluded Transactions</h2>
          {completed.map((x) => {
            return (
              <div className="box-p">
                <p>Schedued transaction to {x.acc_num} has been concluded</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
