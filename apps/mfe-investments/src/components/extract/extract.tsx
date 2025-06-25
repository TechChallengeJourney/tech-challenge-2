import React from 'react';

const BytebankExtract = () => {
  return (
    <div>
      <h1>Bytebank Extract</h1>
      <p>Este é o componente de extrato do Bytebank.</p>
    </div>
  );
};

// Export the component as default for SSR compatibility
export default BytebankExtract;

// Ensure the component can be rendered on the server
export const getServerSideProps = async () => {
  // Simulate fetching data or performing server-side logic
  const data = { message: 'Server-side data for Bytebank Extract' };
  return { props: { data } };
};
