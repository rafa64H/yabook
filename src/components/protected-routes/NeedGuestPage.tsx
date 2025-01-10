import { onAuthStateChanged } from "firebase/auth";
import { useEffect, type PropsWithChildren } from "react";
import { auth } from "../../services/firebase/firebaseInit";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import type { RootState } from "../../services/redux/store";
import setUserReduxStore from "../../utils/setUserReduxStore";

type ProtectedRouteProps = PropsWithChildren;
function NeedGuestPage({ children }: ProtectedRouteProps) {
  const user = useAppSelector((store: RootState) => store.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.loading) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          await setUserReduxStore(user);

          navigate("/");
        }
      });
    }
  }, []);

  return children;
}

export default NeedGuestPage;
