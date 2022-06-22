// React and Styling
import styles from "../styles/Loading.module.scss";
import { useState, useEffect } from 'react';

// MUI
import { LinearProgress, Card } from "@mui/material";

const Loading = () => {
  const [fact, setFact] = useState("");

  useEffect(() => {
      window.scrollTo(0, 0);
      const facts = require("../public/pokemonFacts");
      setFact(facts[Math.floor(Math.random() * Object.keys(facts).length)]);
  }, []);

  return (
      <section className={styles.loadingScreen}>
          <div className={styles.loadingContainer}>
              <Card variant="outlined" className={styles.factCard}>
                  <h1 className={styles.factHeader}>Random Pokémon Fact</h1>
                  <p className={styles.factText}>{fact}</p>
              </Card>
              <div className={styles.loadingAnimation}>
                  <LinearProgress></LinearProgress>
                  <p className={styles.loadingText}>Loading Pokédex...</p>
              </div>
          </div>
      </section>
  )
};

export default Loading;