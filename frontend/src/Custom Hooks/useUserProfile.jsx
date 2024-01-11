import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../utility/authentication.utility";
import { useCookies } from "react-cookie";

const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [cookies] = useCookies([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await getProfile(cookies?.uid);
        setUser(data.user);
      } catch (error) {
        console.log(error);
        setError(error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  return { loading, error, user, setUser, setError, setLoading };
};

export default useUserProfile;
