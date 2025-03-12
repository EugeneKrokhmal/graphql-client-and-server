import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// GraphQL Queries and Mutations
const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!, $password: String!, $profilePhoto: String!) {
    addUser(name: $name, email: $email, password: $password, profilePhoto: $profilePhoto) {
      id
      name
      email
      profilePhoto
    }
  }
`;

const UsersList = () => {
    const { loading, error, data } = useQuery(GET_USERS);
    const [addUser] = useMutation(ADD_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        profilePhoto: '',
        createdAt: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddUser = () => {
        addUser({ variables: { ...formData } });
        setFormData({ name: '', email: '', password: '', profilePhoto: '' });
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">Error: {error.message}</p>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold text-center text-gray-700">User Management</h2>

            {/* Add User Form */}
            <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Add New User</h3>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-2 border rounded-md mb-2"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-2 border rounded-md mb-2"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full p-2 border rounded-md mb-2"
                />
                <input
                    type="text"
                    name="profilePhoto"
                    value={formData.profilePhoto}
                    onChange={handleChange}
                    placeholder="Profile Photo URL"
                    className="w-full p-2 border rounded-md mb-2"
                />
                <button
                    onClick={handleAddUser}
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
                    Add User
                </button>
            </div>

            {/* User List */}
            <h3 className="text-xl font-semibold text-gray-700 mt-6">Users List</h3>
            <ul className="mt-4 space-y-3">
                {data.users.map(user => (
                    <li key={user.id} className="flex items-center bg-white p-3 rounded-lg shadow-md">
                        <img src={user.profilePhoto || "https://via.placeholder.com/50"} alt="Avatar"
                            className="w-12 h-12 rounded-full border mr-3" />
                        <div>
                            <p className="text-lg font-medium text-gray-800">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
