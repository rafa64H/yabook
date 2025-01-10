import { onAuthStateChanged } from "firebase/auth";
import { useEffect, type PropsWithChildren } from "react";
import { auth } from "../../services/firebase/firebaseInit";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import type { RootState } from "../../services/redux/store";
import setUserReduxStore from "../../utils/setUserReduxStore";

type ProtectedRouteProps = PropsWithChildren;
function NeedLoginPage({ children }: ProtectedRouteProps) {
  const user = useAppSelector((store: RootState) => store.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await setUserReduxStore(user);
      } else {
        navigate("/sign-up");
      }
    });
  }, []);

  return children;
}

export default NeedLoginPage;
