import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "..";

async function getActivities(user_id) {
  try {
    const activities = [];

    const q = query(
      collection(db, "activities"),
      where("user_id", "==", user_id)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const activity = doc.data();
      activity.id = doc.id;
      activities.push(activity);
    });

    console.log(activities);

    return activities;
  } catch (error) {
    return new Error(error.message);
  }
}

export { getActivities };
