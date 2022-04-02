import dayjs from "dayjs";
import { collection, addDoc, getDocs, query, where, orderBy, getDoc, doc, updateDoc } from "firebase/firestore";
import { isError } from "../store";
import { db, storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

export const postDiary = async (uid = '', rate = 0, body = '', image = null) => {
  const uploadResult = image ? await uploadImage(image) : '';
  try {
    const docRef = await addDoc(collection(db, "diaries"), {
      uid: uid,
      body: body,
      image: uploadResult,
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

const uploadImage = async (image = null) => {
  try {
    const storageRef = ref(storage);
    const ext = image.name.split('.').pop();
    const hashName = Math.random().toString(36).slice(-8);
    const uploadRef = ref(storageRef, `images/${hashName}.${ext}`);
    const uploadResult = await uploadBytes(uploadRef, image);
    if (uploadResult) {
      const url = await getDownloadURL(uploadRef);
      return url;
    } else {
      return '';
    }
  } catch(e) {
    isError.set(true);
  }
};
