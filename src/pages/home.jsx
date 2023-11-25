import { motion } from "framer-motion";
import { pageTransition } from "../util/animation";
import PetsImage from "/pets.png";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { AdoptCard } from "../components/cards/adoptCard";
import { PricingCard } from "../components/cards/pricingCard";
import { Container } from "../components/containers/container";

export default function Home() {
  const navigate = useNavigate();

  async function getNotAdoptedPets() {
    const petCollectionRef = collection(db, "pets");

    const q = query(petCollectionRef, where("adopted", "==", false), limit(6));
    const data = await getDocs(q);

    const sortedData = data.docs.sort(
      (a, b) => b.data().createdAt - a.data().createdAt,
    );

    return sortedData.map((doc) => ({ ...doc.data(), id: doc.id }));
  }

  const { data: pets, isSuccess } = useQuery({
    queryKey: ["pets"],
    queryFn: getNotAdoptedPets,
  });

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <section className="h-screen w-full flex flex-col gap-5 justify-center items-center">
        <h1 className="text-4xl lg:text-5xl tracking-wider text-center">
          Will you help us find our fur-ever homes?
        </h1>
        <button className="btn btn-md lg:btn-lg btn-accent btn-outline">
          Read our stories
        </button>
        <div className="w-[70%]">
          <img src={PetsImage} alt="pets" />
        </div>
      </section>
      <section className="w-full flex flex-col justify-center items-center mb-6">
        <h1 className="text-4xl lg:text-5xl tracking-wider text-center">
          Looking For Foster Homes
        </h1>
        <div className="grid gap-4 mt-8 place-items-center lg:grid-cols-3 md:grid-cols-2 gird-cols-1">
          {isSuccess &&
            pets.map((pet, index) => <AdoptCard key={index} pet={pet} />)}
        </div>
        <button
          onClick={() => navigate("/adopt")}
          className="btn btn-accent btn-outline btn-lg mt-4"
        >
          Explore more
        </button>
      </section>
      <section className="w-full relative top-36 flex flex-col justify-center items-center mt-20">
        <div className="rounded-full bg-white absolute bottom-[80%]">
          <img
            src="/dog.jpeg"
            alt="dog1"
            className="h-[230px] w-[500px] lg:h-[300px] lg:w-[800px] rounded-full object-cover"
          />
        </div>
        <div className="w-full bg-base-200 pb-16 rounded-b-[6rem]">
          <div className="content px-8 w-full md:mt-48 mt-40 flex flex-col justify-center items-center gap-8 ">
            <h1 className="text-center text-4xl md:text-5xl tracking-wider leading-[50px] md:leading-[70px]">
              Helping Homeless Animals <br /> Find New Homes
            </h1>
            <p className="text-center tracking-wider leading-8">
              Pet Heaven provides the highest-quality care, shelter, and
              dedicated adoption <br />
              servics for all the lost and homeless furry friends that are
              seeking a new foster <br /> family and a forever home.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full mt-48 pb-10">
        <Container>
          <h1 className="text-center text-4xl tracking-widest md:text-5xl">
            Pricing Plan
          </h1>
          <div className="space-y-8 pt-16 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            <PricingCard
              plan="Basic"
              description="Best option to do small activities with the pets."
              price="49"
              features={[
                "Pet Walking",
                "Pet Training",
                "Pet Grooming",
                "Pet Meals",
                "Poop Scooping",
              ]}
            />
            <PricingCard
              plan="Exclusive"
              description="Good for the pets who need special care."
              price="69"
              features={[
                "Pet Walking",
                "Pet Training",
                "Pet Grooming",
                "Pet Meals",
                "Poop Scooping",
              ]}
            />
            <PricingCard
              plan="Adoption"
              description="For those who want to adopt a pet for a good price."
              price="99"
              features={[
                "Pet Adoption Plan",
                "Pet Walking",
                "Pet Training",
                "Pet Grooming",
                "Pet Meals",
              ]}
            />
          </div>
        </Container>
      </section>
    </motion.div>
  );
}
