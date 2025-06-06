'use client';

import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import RamenBuilder from '../../components/RamenBuilder';

export default function RamenPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Layout>
      <RamenBuilder />
    </Layout>
  );
}
