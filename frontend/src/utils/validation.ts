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
        pattern: /^.{6,}$/,
        message: 'Минимум 6 символов',
      },
      {
        type: 'noSpaces',
        pattern: /^\S+$/,
        message: 'Введите корректный логин',
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
        pattern: /^.{6,}$/,
        message: 'Минимум 6 символов',
      },
      {
        type: 'noSpaces',
        pattern: /^\S+$/,
        message: 'Введите корректный пароль',
      },
    ],
  },
};

// Тип для ошибок валидации
interface ValidationErrors {
  [key: string]: string;
}

// Функция валидации поля
export const validateField = (
  value: string,
  fieldName: string,
  rules: IValidationRules,
): string | null => {
  const fieldRules = rules[fieldName];

  // Проходим по всем правилам валидации для данного поля
  for (const rule of fieldRules.validators) {
    // Проверяем, соответствует ли значение текущему правилу валидации
    // rule.pattern - это регулярное выражение для проверки
    // Если значение НЕ соответствует шаблону, возвращаем сообщение об ошибке
    if (!rule.pattern.test(value)) {
      return rule.message; // Возвращаем сообщение об ошибке из правила
    }
  }

  // Если все правила пройдены успешно, возвращаем null
  // Это означает, что значение валидно
  return null;
};

// Функция валидации формы с подробными комментариями
export const validateForm: (
  formData: Record<string, string>,
  rules: IValidationRules,
) => ValidationErrors = (formData, rules) => {
  // 1. Создаем пустой объект для хранения ошибок валидации
  const validationErrors: ValidationErrors = {};

  // 2. Получаем все поля, которые нужно валидировать
  //    Используем Object.keys() для получения массива ключей из объекта правил
  const fieldsToValidate = Object.keys(rules);

  // 3. Проходим по каждому полю из списка валидации
  fieldsToValidate.forEach((fieldName) => {
    // 3.1 Получаем значение поля из формы
    //     Используем || '' для обработки случая, когда поле может быть undefined
    const fieldValue = formData[fieldName] || '';

    // 3.2 Валидируем поле с помощью функции validateField
    //     Передаем значение поля, его имя и правила валидации
    const errorMessage = validateField(fieldValue, fieldName, rules);

    // 3.3 Если обнаружена ошибка валидации
    if (errorMessage) {
      // Сохраняем сообщение об ошибке в объект ошибок
      validationErrors[fieldName] = errorMessage;
    }
  });

  // 4. Возвращаем объект с ошибками валидации
  //    Если ошибок нет, объект будет пустым
  return validationErrors;
};
