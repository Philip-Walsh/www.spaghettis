'use client';

import { useState } from 'react';
import styles from './styles/EdgeRecommendations.module.css';

export default function EdgeRecommendations({ edgeData }) {
  const [expanded, setExpanded] = useState(false);
  
  if (!edgeData) return null;
  
  return (
    <div className={styles.recommendationsCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Edge Function Recommendations</h3>
        <button 
          className={styles.infoButton}
          onClick={() => setExpanded(!expanded)}
          aria-label="Show more information"
        >
          {expanded ? '✖' : 'ℹ️'}
        </button>
      </div>
      
      {expanded && (
        <div className={styles.infoPanel}>
          <h4 className={styles.infoTitle}>What are Edge Functions?</h4>
          <p className={styles.infoText}>
            Edge functions run on servers close to users, detecting device information before the page loads.
            This allows us to customize content based on your device type, location, and preferences.
          </p>
          <h4 className={styles.infoTitle}>How are recommendations generated?</h4>
          <p className={styles.infoText}>
            The edge function detects your device type ({edgeData.deviceType}) and provides tailored 
            recommendations to optimize your experience on this site.
          </p>
          <div className={styles.timestamp}>
            Data generated at: {new Date(edgeData.timestamp).toLocaleString()}
          </div>
        </div>
      )}
      
      <div className={styles.recommendationsList}>
        {edgeData.recommendations.map((rec, index) => (
          <div key={index} className={styles.recommendationItem}>
            <div className={styles.recommendationIcon}>💡</div>
            <div className={styles.recommendationText}>{rec}</div>
          </div>
        ))}
      </div>
      
      <div className={styles.footer}>
        <div className={styles.edgeLabel}>
          <span className={styles.edgeDot}></span>
          Detected by Edge Function
        </div>
        <div className={styles.builtWith}>Built with modern web technologies</div>
      </div>
    </div>
  );
}