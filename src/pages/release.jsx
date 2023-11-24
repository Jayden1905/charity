import { useState } from "react";
import { storage, db, auth } from "../config/firebase-config";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRef } from "react";
import { Loading } from "./loading";
import { motion } from "framer-motion";
import { pageTransition } from "../util/animation";
import { useQuery } from "react-query";
import { AdoptCard } from "../components/cards/adoptCard";
import { Container } from "../components/containers/container";

export function ReleasePet() {
  const [petImageUpload, setPetImageUpload] = useState(null);
  const [toggleToast, setToggleToast] = useState(false);

  const petNameRef = useRef(null);
  const petAgeRef = useRef(null);
  const petImageUploadRef = useRef(null);
  const typeOfPetRef = useRef(null);
  const petGenderRef = useRef(null);

  const [user, loading] = useAuthState(auth);

  const petCollectionRef = collection(db, "pets");

  const submitForm = (e) => {
    e.preventDefault();

    if (petImageUpload == null) return;

    const imageRef = ref(storage, `images/${v4() + petImageUpload.name}`);
    uploadBytes(imageRef, petImageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        addDoc(petCollectionRef, {
          id: v4(),
          userId: user.uid,
          petName: petNameRef.current.value,
          petAge: Number(petAgeRef.current.value),
          petType: typeOfPetRef.current.value,
          petGender: petGenderRef.current.value,
          petImageUrl: url,
          createdAt: serverTimestamp(),
          adopted: false,
        }).then(() => {
          petNameRef.current.value = null;
          petAgeRef.current.value = null;
          typeOfPetRef.current.value = null;
          petGenderRef.current.value = null;
          petImageUploadRef.current.value = null;
          setToggleToast(true);
          setTimeout(() => {
            setToggleToast(false);
          }, 2000);
          refetchPets();
        });
      });
    });
  };

  async function getUserReleasePets() {
    const q = query(petCollectionRef, where("userId", "==", user.uid));
    const data = await getDocs(q);

    const sortedData = data.docs.sort((a, b) => {
      return b.data().createdAt.seconds - a.data().createdAt.seconds;
    });

    return sortedData.map((doc) => ({ ...doc.data(), id: doc.id }));
  }

  const {
    data: pets,
    isSuccess,
    refetch: refetchPets,
  } = useQuery({
    queryKey: ["pets"],
    queryFn: getUserReleasePets,
  });

  async function handleDelete(petId) {
    const petDoc = doc(db, "pets", petId);
    await deleteDoc(petDoc).then(() => refetchPets());
  }

  if (loading) return <Loading />;

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full px-4 pt-20 grid place-items-center"
    >
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
            />
          </div>
          <div className="w-full sm:w-4/5 mx-auto">
            <label className="label">
              <span className="label-text">What is your pet age?</span>
            </label>
            <input
              ref={petAgeRef}
              type="number"
              placeholder="Pet Age"
              className="input input-bordered w-full max-w-xl bg-base-200"
            />
          </div>
          <div className="w-full sm:w-4/5 mx-auto">
            <label className="label">
              <span className="label-text">What is your type of pet?</span>
            </label>
            <input
              ref={typeOfPetRef}
              type="text"
              placeholder="Pet Type"
              className="input input-bordered w-full max-w-xl bg-base-200"
            />
          </div>
          <div className="w-full sm:w-4/5 mx-auto">
            <label className="label">
              <span className="label-text">What is your pet gender?</span>
            </label>
            <input
              ref={petGenderRef}
              type="text"
              placeholder="Pet Gender"
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
      <Container>
        <h1 className="mt-4 text-3xl font-bold">Your Release Pets</h1>
        <div className="flex gap-4 flex-wrap justify-center lg:justify-start items-center my-6">
          {isSuccess &&
            pets.map((pet, index) => (
              <AdoptCard
                pet={pet}
                hasStatus={true}
                key={index}
                hasBtn
                btnLabel={"Delete"}
                clickFn={() => handleDelete(pet.id)}
              />
            ))}
        </div>
      </Container>
    </motion.div>
  );
}
