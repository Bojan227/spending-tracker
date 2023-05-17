import styles from "./page.module.css";
import AccountCard from "../components/accounts/Card";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
import AddUserModal from "../components/accounts/AddUserModal";

async function getUsers() {
  const collectionRef = collection(db, "users");
  const querySnapshot = await getDocs(collectionRef);

  const users = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return users as { id: string; userName: string; color: string }[];
}

export default async function Page() {
  const users = await getUsers();

  return (
    <main className={styles.main}>
      <AddUserModal />
      <div className={styles.cards}>
        {users.map(({ id, userName, color }) => (
          <AccountCard key={id} {...{ id, userName, color }} />
        ))}
      </div>
      <p className={styles.info}>
        You can add extra Accounts here. For example you may want to have
        different accounts for different people, or have a seperate 'Savings'
        account.
      </p>
    </main>
  );
}
