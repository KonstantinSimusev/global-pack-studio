import type {
  IList,
  ILoginData,
  IShift,
  ISuccess,
  IUser,
  IWorker,
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

export const getTeamUsersApi = async (): Promise<IUser[]> => {
  try {
    // Здесь происходит запрос к серверу
    const response = await fetch(`${URL}/users/team`, {
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
    throw new Error();
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

export const getShiftsApi = async (): Promise<IList<IShift>> => {
  try {
    // Здесь происходит запрос к серверу
    const response = await fetch(`${URL}/shifts`, {
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

export const getWorkersApi = async (): Promise<IWorker[]> => {
  try {
    // Здесь происходит запрос к серверу
    const response = await fetch(`${URL}/users/workers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
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

export const addWorkerApi = async (data: {
  personalNumber: number;
}): Promise<IUser> => {
  try {
    const response = await fetch(`${URL}/auth/worker`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Важно добавить эту строку
      body: JSON.stringify(data.personalNumber),
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
