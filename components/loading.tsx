// React and Styling
import styles from "../styles/Loading.module.scss";
import { useState, useEffect } from 'react';

// MUI
import { LinearProgress, Card } from "@mui/material";

const Loading = () => {
  const [fact, setFact] = useState("");

  useEffect(() => {
      const facts = require("../public/pokemonFacts");
      setFact(facts[Math.floor(Math.random() * Object.keys(facts).length)]);
  }, []);

  return (
      <section className={styles.loadingScreen}>
          <div className={styles.loadingContainer}>
              <Card variant="outlined" className={styles.factCard}>
                  <h2 className={styles.factHeader}>Random Pokémon Fact</h2>
                  <p className={styles.factText}>{fact}</p>
              </Card>
              <div className={styles.loadingAnimation}>
                  <LinearProgress id="LinearProgress" aria-describedby="LinearProgress" aria-busy="true"></LinearProgress>
                  <p className={styles.loadingText}>Loading Pokédex...</p>
              </div>
          </div>
      </section>
  );
};

export default Loading;