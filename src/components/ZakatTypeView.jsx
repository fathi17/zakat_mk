import React from 'react';
import { FaHandHoldingUsd, FaCoins, FaArrowLeft } from 'react-icons/fa';

export default function ZakatTypeView({ nextStep, prevStep, updateFormData }) {
  const handleSelect = (type) => {
    updateFormData({ jenisZakat: type });
    nextStep();
  };

  return (
    <div className="view-container">
      <button className="back-btn" onClick={prevStep}>
        <FaArrowLeft /> Kembali
      </button>

      <p className="instruction-text">Silakan pilih jenis Zakat yang ingin ditunaikan.</p>

      <div className="card" onClick={() => handleSelect('Zakat Fitrah')}>
        <div className="card-icon-wrapper">
          <FaHandHoldingUsd size={24} />
        </div>
        <div className="card-content">
          <h3 className="card-title">Zakat Fitrah</h3>
          <p className="card-desc">Berupa beras 2.5kg atau setara Rp45.000/jiwa</p>
        </div>
      </div>

      <div className="card" onClick={() => handleSelect('Zakat Mal')}>
        <div className="card-icon-wrapper">
          <FaCoins size={24} />
        </div>
        <div className="card-content">
          <h3 className="card-title">Zakat Mal</h3>
          <p className="card-desc">Zakat harta benda dan tabungan</p>
        </div>
      </div>
    </div>
  );
}
