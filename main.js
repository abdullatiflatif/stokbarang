import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdgAITXTldockRB_wgxOrbNUPKzSVBhDs",
  authDomain: "insan-cemerlang-c9554.firebaseapp.com",
  projectId: "insan-cemerlang-c9554",
  storageBucket: "insan-cemerlang-c9554.appspot.com",
  messagingSenderId: "753628555075",
  appId: "1:753628555075:web:7a72b2d1e8ae89716931f6",
  measurementId: "G-KMJZ5V0B8H"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambildaftarstok() {
  const refDokumen = collection(db, "stokbarang");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      jumlah: dok.data().jumlah,
    });
  });


  return hasil
}

export async function hapusstok(docId) {
  await deleteDoc(doc(db, "stokbarang", docId));
}

export async function tambahstok( nama, jumlah ) {
  try {
    const dokRef = await addDoc(collection(db, 'stokbarang'), {
     nama:nama,
     jumlah:jumlah,
    });
    console.log('berhasil menembah stok ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah stok ' + e);
  }
}

export async function ubahstok(docId, nama, jumlah) {
  await updateDoc(doc(db, "stokbarang", docId), {
    nama: nama,
    jumlah: jumlah,
  });
}

export async function ambilstok(docId) {
  const docRef = await doc(db, "stokbarang", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}