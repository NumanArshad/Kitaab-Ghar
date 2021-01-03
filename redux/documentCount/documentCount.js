import firebase from "../../utils/firebaseConfig/config";

const documentCountRef = firebase.firestore().collection("documentCounts");

export const getDocumentCount = (document) => {
  return documentCountRef
    .where("type", "==", document)
    .get()
    .then((res) => {
      let countPayload = null;
      res.forEach((payload) => {
        const { count } = payload.data();
        countPayload = { id: payload.id, count };
      });
      return countPayload;
    })
    .catch((err) => Promise.reject(er));
};

export const updateDocumentCount = async (type, remove) => {
  try {
    const { id, count = 0 } = (await getDocumentCount(type)) || {};
    const promise = count
      ? documentCountRef
          .doc(id)
          .update({ count: remove ? count - 1 : count + 1 })
      : documentCountRef.add({ type, count: 0 });
    return promise.then((res) => console.log("document count updated success"));
  } catch (err) {
    return Promise.reject(err.message);
  }
};
