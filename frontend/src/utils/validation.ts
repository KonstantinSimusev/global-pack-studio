// Определяем тип для одного правила валидации
interface IValidationRule {
  type: string;
  pattern: RegExp;
  message: string;
}

// Определяем тип для поля валидации
interface IFieldValidation {
  required: boolean;
  validators: IValidationRule[];
}

// Определяем общий тип для всех правил валидации
interface IValidationRules {
  [fieldName: string]: IFieldValidation;
}

// Объект с расширенными правилами валидации
export const validationRules: IValidationRules = {
  email: {
    required: true,
    validators: [
      {
        type: 'required',
        pattern: /^.+$/,
        message: 'Это поле обязательно',
      },
      {
        type: 'noSpaces',
        pattern: /^\S+$/,
        message: 'Введите корректный адрес почты', // Email не должен содержать пробелы
      },
      {
        type: 'hasAtSymbol',
        pattern: /@/,
        message: 'Введите корректный адрес почты', // 'Отсутствует символ @
      },
      {
        type: 'atSymbolPosition',
        pattern: /^[^@]+@[^@]+$/,
        message: 'Введите корректный адрес почты', // Символ @ должен быть между другими символами
      },
      {
        type: 'domainPart',
        pattern: /@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Введите корректный адрес почты', // Некорректная доменная часть emai
      },
      {
        type: 'latin',
        pattern: /^[a-zA-Z0-9._%+-@]+$/,
        message: 'Введите корректный адрес почты', // Разрешены только латинские символы, цифры и ._%+-@
      },
      {
        type: 'length',
        pattern: /^.{6,100}$/,
        message: 'Введите корректный адрес почты', // Email должен содержать от 6 до 50 символов
      },
      {
        type: 'noLeadingHyphen',
        pattern: /^[a-zA-Z0-9]/,
        message: 'Введите корректный адрес почты', // Домен не может начинаться с дефиса
      },
      {
        type: 'noDoubleHyphens',
        pattern: /^(?!.*--)/,
        message: 'Введите корректный адрес почты', // Запрещено использовать два дефиса подряд
      },
    ],
  },
  login: {
    required: true,
    validators: [
      {
        type: 'required',
        pattern: /^.+$/,
        message: 'Это поле обязательно',
      },
      {
        type: 'length',
        pattern: /^.{8,30}$/,
        message: 'Введите 8-30 символов',
      },
      {
        type: 'noSpaces',
        pattern: /^\S+$/,
        message: 'Введите корректный логин',
      },
      {
        type: 'uppercase',
        pattern: /[A-Z]/,
        message: 'Введите корректный логин', // Должна быть хотя бы одна заглавная буква
      },
    ],
  },
  password: {
    required: true,
    validators: [
      {
        type: 'required',
        pattern: /^.+$/,
        message: 'Это поле обязательно',
      },
      {
        type: 'length',
        pattern: /^.{8,30}$/,
        message: 'Введите 8-30 символов',
      },
      {
        type: 'noSpaces',
        pattern: /^\S+$/,
        message: 'Введите корректный пароль',
      },
      {
        type: 'uppercase',
        pattern: /[A-Z]/, // Проверяет наличие хотя бы одной заглавной буквы
        message: 'Введите корректный пароль', // Должна быть хотя бы одна заглавная буква
      },
    ],
  },
};

// Функция для валидации одного поля
export const validateField = (
  fieldName: string, // Имя поля, которое валидируем
  value: string, // Значение поля для проверки
  rules: IValidationRules, // Объект с правилами валидации
): string => {
  // Получаем правила валидации для конкретного поля
  const fieldRules = rules[fieldName];

  // Проходим по всем валидаторам поля
  for (const validator of fieldRules.validators) {
    // Если значение не соответствует регулярному выражению
    if (!validator.pattern.test(value)) {
      return validator.message; // Возвращаем сообщение об ошибке
    }
  }

  // Если все проверки пройдены, возвращаем пустую строку
  return '';
};

// Функция для валидации всей формы
export const validateForm = (
  formData: Record<string, string>, // Объект с данными формы
  rules: IValidationRules, // Объект с правилами валидации
): Record<string, string> => {
  const errors: Record<string, string> = {}; // Объект для хранения ошибок

  // Проходим по всем полям формы
  for (const fieldName in formData) {
    // Валидируем поле
    const error = validateField(fieldName, formData[fieldName], rules);
    // Если есть ошибка, сохраняем её
    if (error) {
      errors[fieldName] = error;
    }
  }

  return errors; // Возвращаем объект с ошибками
};
