import type {
  ICreateUserShift,
  IList,
  ILoginData,
  IShift,
  ISuccess,
  IUser,
  IUserShift,
} from './api.interface';

// Используем переменную окружения
export const URL = import.meta.env.VITE_API_URL ?? '/api/gps';

export const loginUserApi = async (data: ILoginData): Promise<IUser> => {
  try {
    const response = await fetch(`${URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Важно добавить эту строку
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error();
    }

    // Правильно парсим JSON и возвращаем объект
    return await response.json();
  } catch (error) {
    throw new Error();
  }
};

export const logoutUserApi = async (): Promise<ISuccess> => {
  try {
    const response = await fetch(`${URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Важно для работы с cookie
    });

    if (!response.ok) {
      throw new Error('Ошибка при выходе из системы');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const checkAccessTokenApi = async (): Promise<IUser> => {
  try {
    // Здесь происходит запрос к серверу
    const response = await fetch(`${URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include', // Важно для работы с cookie
    });

    if (!response.ok) {
      // Если ответ не успешный, создаем ошибку, происходит переход в catch
      throw new Error();
    }

    // Если все хорошо, возвращаем данные
    return await response.json();
  } catch (error) {
    // Сюда попадаем при любом throw new Error
    throw error;
  }
};

export const createShiftApi = async (data: IShift): Promise<ISuccess> => {
  try {
    // Здесь происходит запрос к серверу
    const response = await fetch(`${URL}/shifts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include', // Важно для работы с cookie
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    // Если все хорошо, возвращаем данные
    return await response.json();
  } catch (error) {
    // Сюда попадаем при любом throw new Error()
    throw error;
  }
};

export const getTeamShiftsApi = async (): Promise<IList<IShift>> => {
  try {
    // Здесь происходит запрос к серверу
    const response = await fetch(`${URL}/shifts/team-shifts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include', // Важно для работы с cookie
    });

    if (!response.ok) {
      // Если ответ не успешный, создаем ошибку, происходит переход в catch
      throw new Error();
    }

    // Если все хорошо, возвращаем данные
    return await response.json();
  } catch (error) {
    // Сюда попадаем при любом throw new Error()
    throw error;
  }
};

export const deleteShiftApi = async (id: string): Promise<ISuccess> => {
  try {
    const response = await fetch(`${URL}/shifts/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include',
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteUserShiftApi = async (id: string): Promise<ISuccess> => {
  try {
    const response = await fetch(`${URL}/users-shifts/delete-user-shift`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include',
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createUsersShiftsApi = async (id: string): Promise<ISuccess> => {
  try {
    // Здесь происходит запрос к серверу
    const response = await fetch(`${URL}/users-shifts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include', // Важно для работы с cookie
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    // Если все хорошо, возвращаем данные
    return await response.json();
  } catch (error) {
    // Сюда попадаем при любом throw new Error()
    throw error;
  }
};

export const createUserShiftApi = async (
  payload: ICreateUserShift,
): Promise<ISuccess> => {
  try {
    // Здесь происходит запрос к серверу
    const response = await fetch(`${URL}/users-shifts/create-user-shift`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include', // Важно для работы с cookie
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    // Если все хорошо, возвращаем данные
    return await response.json();
  } catch (error) {
    // Сюда попадаем при любом throw new Error()
    throw error;
  }
};

export const getUsersShiftsApi = async (
  id: string,
): Promise<IList<IUserShift>> => {
  try {
    // Здесь происходит запрос к серверу
    const response = await fetch(`${URL}/shifts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include', // Важно для работы с cookie
    });

    if (!response.ok) {
      // Если ответ не успешный, создаем ошибку, происходит переход в catch
      throw new Error();
    }

    // Если все хорошо, возвращаем данные
    return await response.json();
  } catch (error) {
    // Сюда попадаем при любом throw new Error()
    throw error;
  }
};

export const updateUserShiftApi = async (
  payload: IUserShift,
): Promise<ISuccess> => {
  try {
    // Здесь происходит запрос к серверу
    const response = await fetch(`${URL}/users-shifts/update-user-shift`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include', // Важно для работы с cookie
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    // Если все хорошо, возвращаем данные
    return await response.json();
  } catch (error) {
    // Сюда попадаем при любом throw new Error()
    throw error;
  }
};
