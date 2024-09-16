/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';

const CategoryCard = ({ title, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
       
        <div className="absolute top-2 left-2 flex items-center justify-center bg-purple-950 rounded-full py-1 px-3">
          <h2 className="text-white text-sm font-bold uppercase">{title}</h2>
        </div>
        <div className="absolute bottom-2 right-2 flex items-center justify-center bg-green-950 rounded-full py-1 px-3">
          <h2 className="text-white text-sm font-bold uppercase">{title}</h2>
        </div>
        
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default CategoryCard;
