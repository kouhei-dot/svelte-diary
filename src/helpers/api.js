import dayjs from "dayjs";
import { collection, addDoc, getDocs, query, where, orderBy, getDoc, doc, updateDoc } from "firebase/firestore";
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

export const getDiary = async (id = 'dummy') => {
  const docRef = doc(db, 'diaries', id);
  const result = await getDoc(docRef);
  return result.exists() ? result.data() : false;
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

export const updateDiary = async (id = '', body = '', rate = 0, image = '') => {
  const docRef = doc(db, 'diaries', id);
  if (!docRef) return false;
  try {
    await updateDoc(docRef, {
      body: body,
      rate: rate,
      image: image,
    });
    return true;
  } catch(e) {
    return false;
  }
};
