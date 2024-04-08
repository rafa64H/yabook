import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseInit";
export function signInWithEmailAndPasswordFunction(
  email: string,
  password: string,
) {
  const result = signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((err) => {
      return err.code;
    });
  return result;
}
