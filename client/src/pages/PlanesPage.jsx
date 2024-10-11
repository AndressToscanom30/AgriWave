import React, { useState } from 'react';

const PlanesPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="h-screen bg-[#db5252] flex items-center justify-center">
      <h1 className="text-white text-3xl">Planes</h1>
      <button 
        onClick={openModal} 
        className="ml-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Comprar Plan
      </button>
      
      {/* Modal Pago */}
      <ModalPago isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default PlanesPage;
