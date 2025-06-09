import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// 📦 Queries
const GET_USERS = gql`
  query {
    getUsers {
      id
      name
      email
    }
  }
`;

// 📦 Mutations
const CREATE_USER = gql`
  mutation($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id)
  }
`;

function App() {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleCreate = async () => {
    await createUser({ variables: { name, email } });
    refetch(); // refresh list
    setName('');
    setEmail('');
  };

  const handleDelete = async (id) => {
    await deleteUser({ variables: { id } });
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>GraphQL User Manager</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleCreate}>Create User</button>

      <ul>
        {data.getUsers.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}){' '}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
