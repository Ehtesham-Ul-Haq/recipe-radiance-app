import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import UserProfile from '../../components/UserProfile';

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const res = await axios.get(`/api/users/${id}`);
          setUser(res.data.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUser();
    }
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return <UserProfile user={user} />;
};

export default UserPage;
