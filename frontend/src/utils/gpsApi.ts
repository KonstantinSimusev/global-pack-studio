const URL = import.meta.env.VITE_API_URL;

// Интерфейс ответа от сервера
interface IRefreshTokenResponse {
  refreshToken: string;
}

export const checkRefreshTokenApi = async (
  refreshToken: string,
): Promise<IRefreshTokenResponse> => {
  try {
    // Здесь происходит запрос к серверу
    const response = await fetch(`${URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include', // Важно для работы с cookie
      body: JSON.stringify({
        token: refreshToken,
      }),
    });

    if (!response.ok) {
      // Если ответ не успешный, создаем ошибку, происходит переход в catch
      throw new Error('Ошибка авторизации');
    }

    const data: IRefreshTokenResponse = await response.json();

    // Если все хорошо, возвращаем данные
    return data;
  } catch (error) {
    // Сюда попадаем при любом throw new Error
    // Очищаем localStorage
    localStorage.removeItem('refreshToken');
    throw error;
  }
};

interface ILoginData {
  login: string;
  password: string;
}

interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

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

    return response.json();
  } catch (error) {
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
