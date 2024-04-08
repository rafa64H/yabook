import { auth } from "../../firebaseInit";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

export async function reauthenticateUser(password: string) {
  const user = auth.currentUser;
  if (!user) {
    return;
  }
  const credential = EmailAuthProvider.credential(user.email!, password);

  try {
    await reauthenticateWithCredential(user, credential);
  } catch (err) {
    console.log(err);
  }
}
