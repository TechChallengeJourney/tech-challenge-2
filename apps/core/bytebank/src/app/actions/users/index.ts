import { User } from '@bytebank/shared';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchUsers = async (userId?: string) => {
  const hasUserId = (userId) ? '/' + userId : '';
  const res = await fetch(`${apiUrl}/users${hasUserId}`);
  const users = await res.json();
  return users;
};

export const addUser = async (newUser: User) => {
  return await fetch(`${apiUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });
};

export const updateUser = async (userData: User) => {
  return await fetch(`${apiUrl}/users/${userData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
}
