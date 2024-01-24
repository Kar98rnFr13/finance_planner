import { getActivities } from "@/firebase/controllers/events.controller";
import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { auth, db } from "@/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { AuthContext } from "@/app/guest/user/dashboard/layout";

export default function Activities() {
  const [loading, setLoading] = useState(false);

  const { allAct, setAllAct } = useContext(AuthContext);

  useEffect(() => {
    const activities = async () => {
      if (auth.currentUser) {
        try {
          setLoading(true);

          const act = await getActivities(auth.currentUser.uid);

          if (act instanceof Error) {
            setLoading(false);
            console.log("err", act.message);
          } else {
            setLoading(false);
            setAllAct(act);
          }
        } catch (error) {
          setLoading(false);
          console.log(error.message);
        }
      }
    };

    activities();
  }, [auth.currentUser]);

  return (
    <div className="activities">
      <h2>Recent activities</h2>
      {!loading && (
        <>
          {allAct.map((x) => {
            return (
              <div className="act-item" key={x.user_id}>
                <p>{x.desc}</p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
