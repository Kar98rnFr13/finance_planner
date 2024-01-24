import { AuthContext } from "@/app/guest/user/dashboard/layout";
import {
  allCategories,
  updateTransaction,
} from "@/firebase/controllers/categories.controller";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

import "./styles.css";
import { auth } from "@/firebase";

export default function Scheduler({ user_id }) {
  const { allCategory, setAllCategory, allAct, setAllAct } =
    useContext(AuthContext);

  const handleSumit = async (e, c_id, name) => {
    e.preventDefault();
    try {
      const sch = {
        date: e.target.date.value,
        time: e.target.time.value,
        executed: false,
      };

      const c = await updateTransaction(
        c_id,
        sch,
        auth.currentUser.uid,
        name,
        setAllAct
      );

      if (c instanceof Error) {
        toast.danger(c.message);
      } else {
        toast.success("Payment schedule set.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="con">
      <h2>Shedule transactions</h2>
      {allCategory.map((x) => {
        return (
          <div className="box">
            <div className="flex-con">
              <div className="desc">
                <p>{x.particular}</p>
                <p>Acc: {x.acc_num}</p>
              </div>

              <form onSubmit={(e) => handleSumit(e, x.id, x.particular)}>
                <div className="flex-con-item">
                  <input type="date" name="date" id="date" />
                  <input type="time" name="time" id="time" />
                  <button type="submit">Schedule</button>
                </div>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}
