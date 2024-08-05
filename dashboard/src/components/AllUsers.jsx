import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/v1/user/allusers",
                    {
                        params: { search, limit, page },
                        withCredentials: true
                    }
                );
                if (data && data.patients) {
                    setUsers(data.patients);
                    setTotalPages(data.totalPages);
                } else {
                    console.error("Unexpected API response structure:", data);
                    toast.error("Unexpected API response structure");
                }
            } catch (error) {
                console.error("Error fetching Users:", error);
                toast.error(error.response?.data?.message || "Error fetching users");
            }
        };
        fetchUsers();
    }, [search, limit, page]);

    return (
        <section className="dashboard page">
            <div className="total-users">
                <p>Total Users: <span>{users.length}</span></p>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select onChange={(e) => setLimit(e.target.value)} value={limit}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="0">All Users</option>
                </select>
            </div>
            <div className="user-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>Date Of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0
                            ? users.map((user) => (
                                <tr key={user._id}>
                                    <td>{`${user.firstName} ${user.lastName}`}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.dob.substring(0, 10)}</td>
                                </tr>
                            ))
                            : <tr><td colSpan="5">No User Found!</td></tr>}
                    </tbody>
                </table>
            </div>
            {limit !== "0" && (
                <div className="pagination">
                    <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                        Previous
                    </button>
                    <span>{page} of {totalPages}</span>
                    <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                        Next
                    </button>
                </div>
            )}
        </section>
    );
};

export default AllUsers;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const AllUsers = () => {
//     const [users, setUsers] = useState([]);
//     const [search, setSearch] = useState("");
//     const [limit, setLimit] = useState(10);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const { data } = await axios.get(
//                     "http://localhost:4000/api/v1/user/allusers",
//                     {
//                         params: { search, limit, page },
//                         withCredentials: true
//                     }
//                 );
//                 if (data && data.patients) {
//                     setUsers(data.patients);
//                     setTotalPages(data.totalPages);
//                 } else {
//                     console.error("Unexpected API response structure:", data);
//                     toast.error("Unexpected API response structure");
//                 }
//             } catch (error) {
//                 console.error("Error fetching Users:", error);
//                 toast.error(error.response?.data?.message || "Error fetching users");
//             }
//         };
//         fetchUsers();
//     }, [search, limit, page]);

//     return (
//         <section className="dashboard page">
//             <div className="banner">
//                 <div className="firstBox">
//                     <img src="/doc.png" alt="docImg" />
//                     <div className="content">
//                         <div>
//                             <p>Hello,</p>
//                             <h5>{/* Display user's name here if available */}</h5>
//                         </div>
//                         <p>
//                             Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//                             Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
//                             Assumenda repellendus necessitatibus itaque.
//                         </p>
//                     </div>
//                 </div>
//                 <div className="secondBox">
//                     <p>Total Users</p>
//                     <h3>{users.length}</h3>
//                 </div>
//                 <div className="thirdBox">
//                     <p>Registered Doctors</p>
//                     {/* <h3>{doctors.length}</h3> */}
//                 </div>
//             </div>
//             <div className="banner">
//                 <h5>Users</h5>
//                 <div>
//                     <input
//                         type="text"
//                         placeholder="Search users..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                     />
//                     <select onChange={(e) => setLimit(e.target.value)} value={limit}>
//                         <option value="10">10</option>
//                         <option value="20">20</option>
//                         <option value="50">50</option>
//                         <option value="0">All Users</option>
//                     </select>
//                 </div>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Gender</th>
//                             <th>Date Of Birth</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.length > 0
//                             ? users.map((user) => (
//                                 <tr key={user._id}>
//                                     <td>{`${user.firstName} ${user.lastName}`}</td>
//                                     <td>{user.email}</td>
//                                     <td>{user.phone}</td>
//                                     <td>{user.gender}</td>
//                                     <td>{user.dob.substring(0, 16)}</td>
//                                 </tr>
//                             ))
//                             : <tr><td colSpan="5">No User Found!</td></tr>}
//                     </tbody>
//                 </table>
//                 {limit !== "0" && (
//                     <div>
//                         <button onClick={() => setPage(page - 1)} disabled={page === 1}>
//                             Previous
//                         </button>
//                         <span>{page} of {totalPages}</span>
//                         <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
//                             Next
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// };

// export default AllUsers;





