import dayjs from "dayjs";
import { collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import { isError } from "../store";
import { db } from "./firebase";

export const getDiaries = async (uid = '') => {
  try {
    const q = query(collection(db, 'diaries'), where('uid', '==', uid), orderBy('createdAt', 'desc'));
    const data = await getDocs(q);
    return data.docs.map((doc) => {
      return {
        id: doc.id,
        body: doc.data().body,
        rate: doc.data().rate,
        image: doc.data().image,
        createdAt: doc.data().createdAt,
      };
    });
  } catch(e) {
    isError.set(true);
  }
};

export const postDiary = async (uid = '', rate = 0, body = '') => {
  try {
    const docRef = await addDoc(collection(db, "diaries"), {
      uid: uid,
      body: body,
      image: '',
      rate: rate,
      createdAt: dayjs().format('YYYY/MM/DD HH:mm:ss'),
    });
    return !!docRef.id
  } catch (e) {
    isError.set(true);
  }
};
