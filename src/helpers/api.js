import dayjs from "dayjs";
import { collection, addDoc } from "firebase/firestore";
import { isError } from "../store";
import { db } from "./firebase";

export const postDiary = async (uid = '', rate = 0, body = '') => {
  try {
    const docRef = await addDoc(collection(db, "diaries"), {
      uid: uid,
      body: body,
      rate: rate,
      createdAt: dayjs().format('YYYY/MM/DD HH:mm:ss'),
    });
    return !!docRef.id
  } catch (e) {
    isError.set(true);
  }
};
