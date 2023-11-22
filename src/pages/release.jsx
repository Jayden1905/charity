import { useState } from "react";
import { storage, db, auth } from "../config/firebase-config";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRef } from "react";
import { Loading } from "./loading";
import { useNavigate } from "react-router-dom";

export function ReleasePet() {
  const [petName, setPetName] = useState("");
  const [petAge, setPetAge] = useState(0);
  const [petImageUpload, setPetImageUpload] = useState(null);
  const [toggleToast, setToggleToast] = useState(false);
  const petNameRef = useRef(null);
  const petAgeRef = useRef(null);
  const petImageUploadRef = useRef(null);

  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);

  const petCollectionRef = collection(db, "pets");

  const submitForm = (e) => {
    e.preventDefault();

    if (petImageUpload == null) return;

    const imageRef = ref(storage, `images/${petImageUpload.name + v4()}`);
    uploadBytes(imageRef, petImageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        addDoc(petCollectionRef, {
          userId: user.uid,
          petName: petName,
          petAge: Number(petAge),
          petImageUrl: url,
          createdAt: serverTimestamp(),
        }).then(() => {
          petNameRef.current.value = "";
          petAgeRef.current.value = 0;
          petImageUploadRef.current.value = null;
          setToggleToast(true);
          setTimeout(() => {
            setToggleToast(false);
          }, 1000);
        });
      });
    });
  };

  if (loading) return <Loading />;

  if (!user) navigate("/");

  return (
    <div className="w-full px-4 pt-20 grid place-items-center">
      {toggleToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>Form submitted successfully.</span>
          </div>
        </div>
      )}
      <div className="w-full sm:w-3/5 h-full shadow-md bg-base-200 rounded py-6 px-4 flex flex-col justify-center items-center">
        <h1 className="text-2xl pb-6 capitalize">Form for your pet release</h1>
        <form
          onSubmit={(e) => submitForm(e)}
          className="w-full flex flex-col gap-2 justify-center items-center"
        >
          <div className="w-full sm:w-4/5 mx-auto">
            <label className="label">
              <span className="label-text">What is your pet name?</span>
            </label>
            <input
              ref={petNameRef}
              type="text"
              placeholder="Pet Name"
              className="input input-bordered w-full max-w-xl bg-base-200"
              onChange={(e) => {
                setPetName(e.target.value);
              }}
            />
          </div>
          <div className="w-full sm:w-4/5 mx-auto">
            <label className="label">
              <span className="label-text">What is your pet age?</span>
            </label>
            <input
              ref={petAgeRef}
              type="number"
              onChange={(e) => {
                setPetAge(e.target.value);
              }}
              placeholder="Pet Age"
              className="input input-bordered w-full max-w-xl bg-base-200"
            />
          </div>
          <div className="w-full sm:w-4/5 mx-auto">
            <label className="label">
              <span className="label-text">Pick a file</span>
            </label>
            <input
              ref={petImageUploadRef}
              type="file"
              onChange={(e) => {
                setPetImageUpload(e.target.files[0]);
              }}
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>
          <div className="w-full sm:w-4/5 mx-auto">
            <button className="btn btn-accent w-[200px]">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
