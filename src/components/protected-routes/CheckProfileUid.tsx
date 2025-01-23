import React, {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import type {
  FirestoreData,
  FirestoreFriendsOnlyData,
} from "../../types/user-types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseInit";
import setUserReduxStore from "../../utils/setUserReduxStore";
import { getPublicInformationOfUser } from "../../services/firebase/utils/user-related/getPublicInfoUser";

type ProtectedRouteProps = PropsWithChildren;

type DifferentUserContextType = {
  publicFirestoreDataOfUser: FirestoreData | null | undefined;
  setPublicFirestoreDataOfUser:
    | React.Dispatch<React.SetStateAction<FirestoreData | null | undefined>>
    | undefined;
};

export const DifferentUserContext = createContext<DifferentUserContextType>({
  publicFirestoreDataOfUser: undefined,
  setPublicFirestoreDataOfUser: undefined,
});

export const EqualUidContext = createContext<boolean | undefined>(undefined);

function CheckProfileUid({ children }: ProtectedRouteProps) {
  const user = useAppSelector((store) => store.auth.user);
  const params = useParams();
  const [equalUidToUser, setEqualUidToUser] = useState<boolean | undefined>(
    undefined,
  );

  const [publicFirestoreDataOfUser, setPublicFirestoreDataOfUser] =
    React.useState<FirestoreData | undefined | null>(null);

  const uidParam = params.uid;

  useEffect(() => {
    if (user.loading) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          await setUserReduxStore(user);

          if (user.uid === uidParam) {
            setEqualUidToUser(true);
            return;
          } else setEqualUidToUser(false);

          if (!uidParam) return;
          const publicData = getPublicInformationOfUser(uidParam).then(
            (publicData) => {
              setPublicFirestoreDataOfUser(publicData);
              console.log(publicData);
            },
          );
        }
      });
    } else {
      if (user.uid === uidParam) {
        setEqualUidToUser(true);
        return;
      } else setEqualUidToUser(false);

      if (!uidParam) return;
      const publicData = getPublicInformationOfUser(uidParam).then(
        (publicData) => {
          setPublicFirestoreDataOfUser(publicData);
          console.log(publicData);
        },
      );
    }
  }, []);

  return (
    <EqualUidContext.Provider value={equalUidToUser}>
      <DifferentUserContext.Provider
        value={{ publicFirestoreDataOfUser, setPublicFirestoreDataOfUser }}
      >
        {children}
      </DifferentUserContext.Provider>
    </EqualUidContext.Provider>
  );
}

export default CheckProfileUid;
