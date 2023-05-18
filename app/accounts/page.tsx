import styles from "./page.module.css";

import AddUserModal from "../components/accounts/AddUserModal";

import { Users } from "../components/accounts/Users";

export default async function Page() {
  return (
    <main className={styles.main}>
      <AddUserModal />
      <Users />
      <p className={styles.info}>
        You can add extra Accounts here. For example you may want to have
        different accounts for different people, or have a seperate 'Savings'
        account.
      </p>
    </main>
  );
}
