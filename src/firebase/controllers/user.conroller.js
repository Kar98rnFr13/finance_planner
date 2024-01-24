import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "..";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

async function signUpUser({ data, pass }) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      pass
    );
    const user = userCredential.user;
    console.log(user);
    const docRef = doc(db, "users", user.uid);

    await setDoc(docRef, data);
  } catch (error) {
    return new Error(error.message, error.code);
  }
}

async function loginUser({ email, pass }) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);

    const user = userCredential.user;

    return user;
  } catch (error) {
    return new Error(error.message);
  }
}

async function getUser(user_id) {
  try {
    let currentUser;
    const docRef = doc(db, "users", user_id);

    const user = await getDoc(docRef);

    if (user.exists()) {
      currentUser = user.data();
      return currentUser;
    } else {
      console.log("user not found");
      return new Error("user not found");
    }
  } catch (error) {
    return new Error(error.message);
  }
}

// async function addExpenses({ user_id, data }) {
//   try {
//     const docRef = doc(db, "users", user_id);
//     const cate = await updateDoc(docRef, {
//       categories: arrayUnion(data),
//       timestamp: serverTimestamp(),
//     });
//   } catch (error) {
//     return new Error(error.message);
//   }
// }

export { signUpUser, loginUser, getUser };
