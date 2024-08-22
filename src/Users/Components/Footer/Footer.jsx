// src/Components/Footer/Footer.js
import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#005A8C] text-white py-4 px-10">
      <div className="flex flex-row justify-around mx-auto text-center">
        <p className="flex justify-center mt-4"> &copy; {currentYear} Gennex Solutions., Ltd</p>
        <div className="flex justify-center mt-4">
         <p>privacy Policy</p>
         <p>Teams & Conditions</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
