const URL = import.meta.env.VITE_API_URL;

interface ILoginData {
  login: string;
  password: string;
}

interface ILoginResponse {
  id: string;
  login: string;
  refreshToken: string;
  refreshTokenCreatedAt: string;
}

export const loginUserApi = async (
  data: ILoginData,
): Promise<ILoginResponse> => {
  try {
    const response = await fetch(`${URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  } catch (error) {
    throw new Error();
  }
};

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
      // credentials: 'include', // Важно для работы с cookie
      body: JSON.stringify({
        refreshToken: refreshToken,
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

interface ILogoutResponse {
  success: boolean;
  message: string;
  id: string;
}

export const logoutUserApi = async (
  userId: string,
): Promise<ILogoutResponse> => {
  try {
    const response = await fetch(`${URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при выходе из системы');
    }

    const data: ILogoutResponse = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
