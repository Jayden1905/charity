import { motion } from "framer-motion";
import { pageTransition } from "../util/animation";
import PetsImage from "/pets.png";
export default function Home() {
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
        <button className="btn btn-md lg:btn-lg btn-primary">
          Read our stories
        </button>
        <div className="w-[70%]">
          <img src={PetsImage} alt="pets" />
        </div>
      </section>
      <section className="h-screen w-full flex flex-col justify-center items-center">
        <h1 className="text-4xl lg:text-5xl tracking-wider text-center">
          Looking For Foster Homes
        </h1>
      </section>
    </motion.div>
  );
}
