import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";

export function Avatar() {
  const [user] = useAuthState(auth);

  return (
    <img
      referrerPolicy="no-referrer"
      className="w-10 h-10 rounded-full cursor-pointer"
      src={user.photoURL}
      alt="Rounded avatar"
    />
  );
}
