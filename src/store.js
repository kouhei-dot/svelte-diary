import { writable } from 'svelte/store';
import Cookies from 'js-cookie';

const uid = Cookies.get('uid');
export const userId = writable(uid ? uid : null);
