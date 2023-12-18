import React , {useEffect , useState} from 'react'
import {useNavigate} from "react-router-dom"
import { getProfile } from '../utility/authentication.utility';


const useUserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
          try {
            setLoading(true);
            const data = await getProfile();
            console.log(data)
            setUser(data.user);
          } catch (error) {
            console.log(error);
            setError(error);
            navigate("/login");
          }finally{
            setLoading(false);
          }
        };
    
        fetchUser();
      }, []);
  return (
    {loading , error , user , setUser , setError , setLoading}
  )
}

export default useUserProfile;