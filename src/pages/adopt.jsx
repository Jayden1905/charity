import { motion } from "framer-motion";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase-config";
import { Container } from "../components/containers/container";
import { pageTransition } from "../util/animation";
import { useMutation, useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRef } from "react";
import { useState } from "react";

export function AdpotPage() {
  const [user] = useAuthState(auth);
  const [success, setSuccess] = useState(false);
  const [petId, setPetId] = useState("");

  const userNameRef = useRef("");
  const userAddressRef = useRef("");
  const userPhoneRef = useRef("");

  const [error, setError] = useState({ status: false, message: "" });

  const modalRef = useRef(null);

  async function getNotAdoptedPets() {
    const petCollectionRef = collection(db, "pets");

    const q = query(petCollectionRef, where("adopted", "==", false));
    const data = await getDocs(q);

    // sort data on createdAt
    const sortedData = data.docs.sort(
      (a, b) => b.data().createdAt - a.data().createdAt,
    );

    return sortedData.map((doc) => ({ ...doc.data(), id: doc.id }));
  }

  const {
    data: pets,
    isSuccess,
    refetch: refetchPets,
  } = useQuery({
    queryKey: ["pets"],
    queryFn: getNotAdoptedPets,
  });

  const adopt = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();

      if (
        !userNameRef.current.value ||
        !userAddressRef.current.value ||
        !userPhoneRef.current.value
      ) {
        throw new Error("Please fill all the fields.");
      }

      const adoptPet = pets.find((pet) => pet.id === petId);

      const petDoc = doc(db, "pets", adoptPet.id);

      await updateDoc(petDoc, {
        adopted: true,
      });

      // await updateStatus(adoptPet.id, true);
    },

    onSuccess: () => {
      modalRef.current.close();
      refetchPets();
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      modalRef.current.close();
    },

    onError: (error) => {
      setError({ status: true, message: error.message });
      setTimeout(() => {
        setError({ status: false, message: "" });
      }, 2000);
    },
  });

  function showModal(id) {
    if (!user) {
      setError({ status: true, message: "You need to be a member." });
      setTimeout(() => {
        setError({ status: false, message: "" });
      }, 2000);
    } else {
      const adoptPet = pets.find((pet) => pet.id === id);
      if (user.uid === adoptPet.userId) {
        setError({ status: true, message: "You can't adopt your own pet." });

        setTimeout(() => {
          setError({ status: false, message: "" });
        }, 2000);
        return;
      }

      modalRef.current.showModal();
    }
  }

  return (
    <motion.div
      variants={pageTransition}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
      className="pt-20"
    >
      {success && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>Successfully adopted.</span>
          </div>
        </div>
      )}
      {error.status && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-error">
            <span>{error.message}</span>
          </div>
        </div>
      )}
      <Container>
        <div className="flex gap-4 flex-wrap justify-center lg:justify-start items-center">
          {isSuccess &&
            pets.map((pet, index) => (
              <div
                key={index}
                className="bg-base-300 p-3 rounded shadow-md flex flex-col gap-2"
              >
                <p className="capitalize">Name: {pet.petName}</p>
                <p className="capitalize">Age: {pet.petAge}</p>
                <p className="capitalize">Type: {pet.petType}</p>
                <p className="capitalize">Gender: {pet.petGender}</p>
                <div>
                  <img
                    src={pet.petImageUrl}
                    className="object-cover h-64 w-64 rounded"
                    alt="petImg"
                  />
                </div>
                <button
                  className="btn btn-accent"
                  onClick={() => {
                    setPetId(pet.id);
                    showModal(pet.id);
                  }}
                >
                  Adopt
                </button>
              </div>
            ))}
          <dialog ref={modalRef} id="my_modal_2" className="modal">
            <div className="modal-box w-full">
              <form
                onSubmit={(e) => adopt.mutate(e)}
                className="flex flex-col gap-2"
              >
                <div className="w-full mx-auto">
                  <label className="label">
                    <span className="label-text">What is your name?</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input input-bordered w-full max-w-xl bg-base-200"
                    ref={userNameRef}
                  />
                </div>
                <div className="w-full mx-auto">
                  <label className="label">
                    <span className="label-text">What is your address?</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    className="input input-bordered w-full max-w-xl bg-base-200"
                    ref={userAddressRef}
                  />
                </div>
                <div className="w-full mx-auto">
                  <label className="label">
                    <span className="label-text">What your phone number?</span>
                  </label>
                  <input
                    type="phone"
                    placeholder="Phone number"
                    className="input input-bordered w-full max-w-xl bg-base-200"
                    ref={userPhoneRef}
                  />
                </div>
                <div className="w-full mx-auto">
                  <button className="btn btn-accent w-[200px]">Submit</button>
                </div>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </Container>
    </motion.div>
  );
}
