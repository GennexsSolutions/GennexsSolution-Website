const Card = ({ image, name, subname }) => {
  return (
    <div className="bg-white w-full max-w-xs sm:w-[18rem] h-[30vh] rounded-lg shadow shadow-gray-200 p-6 flex flex-col items-center text-center">
      <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-b from-[#227AFF] to-[#38D0E4] flex items-center justify-center overflow-hidden">
        <img
          src={`http://localhost:3000/images/${image}`}
          className="w-[2rem] h-[2rem] filter invert"
          alt={name}
        />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{name}</h3>
      <p className="text-sm text-gray-600">{subname}</p>
    </div>
  );
};

export default Card;
