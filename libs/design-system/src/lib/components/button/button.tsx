import React from 'react';

const MyButton: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>{label}</button>
  );
};

export default MyButton;