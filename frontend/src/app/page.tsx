import styles from "./page.module.scss";

const Home = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>◈</span>
            <span>Powered by You</span>
          </div>

          <h1 className={styles.title}>
            <span className={styles.titleAccent}>Turing</span> Demo Environment
          </h1>

          <p className={styles.subtitle}>
            Welcome to the StudentHub sandbox — a demo application where{" "}
            <strong>Turing</strong>, our LangGraph-powered AI agent, implements
            features and fixes bugs based on GitHub tickets.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
