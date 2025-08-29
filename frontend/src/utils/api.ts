const URL = import.meta.env.VITE_API_URL;

interface ILoginData {
  login: string;
  password: string;
}

interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

// Функция для сохранения токенов в cookie
const saveTokens = (tokens: ILoginResponse) => {
  // Создаем cookie с нужными атрибутами
  document.cookie = `accessToken=${tokens.accessToken}; HttpOnly; Secure; SameSite=Lax`;
  document.cookie = `refreshToken=${tokens.refreshToken}; HttpOnly; Secure; SameSite=Lax`;
};

export const loginUserApi = async (
  data: ILoginData,
): Promise<ILoginResponse> => {
  try {
    const response = await fetch(`${URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    // Сохраняем токены после успешного входа
    saveTokens(responseData);

    return responseData;
  } catch (error) {
    // Очищаем cookie при ошибке
    document.cookie =
      'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    document.cookie =
      'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    throw error;
  }
};

// interface IUser {
//   id: string;
//   login: string;
// }

// interface IUsersResponse {
//   users: IUser[];
//   total: number;
// }

// export const getUsersApi = async (): Promise<IUsersResponse> => {
//   try {
//     const response = await fetch(`${URL}/users`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Ошибка при получении списка пользователей');
//     }

//     return await response.json();
//   } catch (error) {
//     throw error;
//   }
// };
