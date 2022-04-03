import dayjs from "dayjs";
import { collection, addDoc, getDocs, query, where, orderBy, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
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
  const uploadResult = image.name ? await uploadImage(image) : '';
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
    return false;
  }
};

export const updateDiary = async (id = '', diary = null, image = '') => {
  const docRef = doc(db, 'diaries', id);
  if (!docRef) return false;
  if (image.name) {
    const path = findRef(diary.image);
    const result = await uploadImage(image, path);
    if (!diary.image) diary.image = result;
  }
  try {
    await updateDoc(docRef, {
      body: diary.body,
      rate: diary.rate,
      image: diary.image,
    });
    return true;
  } catch(e) {
    return false;
  }
};

const uploadImage = async (image = null, path = '') => {
  try {
    if (!path) {
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
    } else {
      const uploadRef = ref(ref(storage), path);
      await uploadBytes(uploadRef, image);
      return '';
    }
  } catch(e) {
    isError.set(true);
  }
};

export const deleteDiary = async (id = '') => {
  if (!id) return false;
  const ref = doc(db, 'diaries', id);
  await deleteDoc(ref);
  return true;
};

const findRef = (imageUrl = '') => {
  if (!imageUrl) return '';
  const url = imageUrl.split('/')[7].split('?')[0];
  return url.replace('%2F', '/');
};
