/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

const UserProfile = ({ user }) => {
  return (
    <div className="profile">
      <img src={user.image} alt={user.name} className="profile-image" />
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <h2>Favorites:</h2>
      <ul>
        {user.favoritesRecipes.map((recipe) => (
          <li key={recipe._id}>
            <Link href={`/recipe/${recipe._id}`}>
              <a>{recipe.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
