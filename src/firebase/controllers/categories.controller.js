import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "..";

async function addCategory({ data, setAllCategory }) {
  try {
    const docRef = collection(db, "categories");
    await addDoc(docRef, data);

    // schedule

    const category = [];
    const q = query(
      collection(db, "categories"),
      where("user_id", "==", data.user_id)
    );

    const quetSnapshot = await getDocs(q);

    quetSnapshot.forEach((doc) => {
      const c = { ...doc.data() };
      c.id = doc.id;
      category.push(c);
    });

    setAllCategory(category);
  } catch (error) {
    return new Error(error.message);
  }
}

async function getCategories(user_id, selectedCat) {
  try {
    const category = [];
    const docRef = query(
      collection(db, "categories"),
      where("user_id", "==", user_id),
      where("category", "==", selectedCat)
    );

    const quetSnapshot = await getDocs(docRef);

    quetSnapshot.forEach((doc) => {
      const c = { ...doc.data() };
      c.id = doc.id;

      category.push(c);
    });
    console.log(category);
    return category;
  } catch (error) {
    return new Error(error.message);
  }
}

async function transactions(user_id) {
  try {
    const upcomingTransactions = [];
    const concludedTransactions = [];
    const docRef = query(
      collection(db, "categories"),
      where("user_id", "==", user_id),
      where("sch", "!=", null)
    );

    const quetSnapshot = await getDocs(docRef);

    quetSnapshot.forEach((doc) => {
      const c = { ...doc.data() };
      c.id = doc.id;
      if (!c.sch.executed) {
        upcomingTransactions.push(c);
      } else if (c.sch.executed) {
        concludedTransactions.push(c);
      }
    });
    const resullt = { upcomingTransactions, concludedTransactions };
    return resullt;
  } catch (error) {
    return new Error(error.message);
  }
}

async function editCategory(c_id, data) {
  try {
    const docRef = doc(db, "categories", c_id);
    await updateDoc(docRef, data);
  } catch (error) {
    return new Error(error.message);
  }
}

async function updateTransaction(c_id, data, user_id, name, setAllAct) {
  try {
    const docRef = doc(db, "categories", c_id);
    await updateDoc(docRef, {
      sch: data,
    });

    const actRef = collection(db, "activities");

    if (data.executed) {
      await addDoc(actRef, {
        user_id,
        desc: `Transaction completed for ${name}`,
      });
    } else {
      await addDoc(actRef, {
        user_id,
        desc: `Transaction scheduled for ${name}`,
      });
    }

    // get activities
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

    setAllAct(activities);
  } catch (error) {
    return new Error(error.message);
  }
}

async function getCategory(c_id) {
  try {
    let category;
    const docRef = doc(db, "categories", c_id);

    const data = await getDoc(docRef);

    if (data.exists()) {
      category = data.data();
      return category;
    } else {
      return new Error("Cannot find category");
    }
  } catch (error) {
    return new Error(error.message);
  }
}

async function deleteCategory(c_id, user_id, selectedCat) {
  try {
    const docRef = doc(db, "categories", c_id);
    await deleteDoc(docRef);

    const category = [];
    const colRef = query(
      collection(db, "categories"),
      where("user_id", "==", user_id),
      where("category", "==", selectedCat)
    );

    const quetSnapshot = await getDocs(colRef);

    quetSnapshot.forEach((doc) => {
      const c = { ...doc.data() };
      c.id = doc.id;

      category.push(c);
    });
    console.log(category);
    return category;
  } catch (error) {
    return new Error(error.message);
  }
}

async function allCategories({ user_id }) {
  try {
    const category = [];
    const docRef = query(
      collection(db, "categories"),
      where("user_id", "==", user_id)
    );

    const quetSnapshot = await getDocs(docRef);

    quetSnapshot.forEach((doc) => {
      const c = { ...doc.data() };
      c.id = doc.id;
      category.push(c);
    });
    console.log("cat", user_id);
    return category;
  } catch (error) {
    return new Error(error.message);
  }
}

export {
  addCategory,
  getCategories,
  getCategory,
  editCategory,
  deleteCategory,
  allCategories,
  updateTransaction,
  transactions,
};
