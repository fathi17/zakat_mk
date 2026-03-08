import React from 'react';
import { FaHandHoldingUsd, FaMosque, FaHeart } from 'react-icons/fa';

export default function HomeView({ nextStep, goToStep, updateFormData }) {
  const handleSelect = (type) => {
    updateFormData({ jenisZakat: type });
    if (type === 'Zakat') {
      nextStep();
    } else {
      goToStep(3);
    }
  };

  return (
    <div className="view-container">
      <p className="instruction-text">Silakan pilih jenis donasi.</p>
      
      <div className="card" onClick={() => handleSelect('Zakat')}>
        <div className="card-icon-wrapper">
          <FaHandHoldingUsd size={24} />
        </div>
        <div className="card-content">
          <h3 className="card-title">Zakat</h3>
          <p className="card-desc">Zakat Fitrah dan Zakat Mal</p>
        </div>
      </div>

      <div className="card" onClick={() => handleSelect('Infaq')}>
        <div className="card-icon-wrapper">
          <FaMosque size={24} />
        </div>
        <div className="card-content">
          <h3 className="card-title">Infaq</h3>
          <p className="card-desc">Donasi untuk kegiatan masjid</p>
        </div>
      </div>

      <div className="card" onClick={() => handleSelect('Sedekah')}>
        <div className="card-icon-wrapper">
          <FaHeart size={24} />
        </div>
        <div className="card-content">
          <h3 className="card-title">Sedekah</h3>
          <p className="card-desc">Sedekah umum</p>
        </div>
      </div>
    </div>
  );
}
