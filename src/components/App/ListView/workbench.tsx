// import { useSelector } from "react-redux";
// import React, { useState, useEffect } from "react";
// import { ListViewWrapper } from "./styled";
// import HorseList from "./HorseList";
// import store, { RootState } from "../../../redux/store";
// import { ModalData } from "./AddHorseModal/ModalData";
// import axios from 'axios';

// // Create an Axios instance
// const axiosInstance = axios.create({
//   baseURL: `${process.env.API_HOST}/v1`,
//   withCredentials: true,
// });

// // Add a request interceptor to include the token in the headers
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const state: RootState = store.getState();
//     const token = state.auth.tokens?.access?.token;
//     console.log("line:9", token);
    
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Function to fetch horses by user ID
// const getHorsesByUser = async (userId: string) => {
//   try {
//     const response = await axiosInstance.get(`/users/${userId}/horses`);
//     console.log("line:10", response);
    
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching horses:', error);
//     throw error;
//   }
// };

// /**
//  * displays the pferde list or a modal to add a new pferde, depending on state
//  * @param cms - relevant content for this component from strapi
//  * @returns {JSX.Element}
//  */
// function ListViewComponent({ cms }: { cms: any }) {
//   const user = useSelector((state: RootState) => state.auth.user);
//   console.log("line:11", user);
//   const data = useSelector((state: RootState) => state);
//   console.log("line:12", data);

//   const [horseData, setHorseData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHorses = async () => {
//       if (user?.id) {
//         try {
//           setLoading(true);
//           const data = await getHorsesByUser(user.id);
//           setHorseData(data);
//         } catch (error) {
//           setError(error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchHorses();
//   }, [user?.id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading horses</div>;
//   }

//   return (
//     <ListViewWrapper>
//       <HorseList
//         horses={horseData}
//         cms={cms}
//       />
//     </ListViewWrapper>
//   );
// }

// export const ListView = ListViewComponent;
