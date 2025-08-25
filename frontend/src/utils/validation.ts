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
const validationRules: IValidationRules = {
  email: {
    required: true,
    validators: [
      {
        type: 'required',
        pattern: /^.+$/,
        message: 'Поле обязательно для заполнения',
      },
      {
        type: 'noSpaces',
        pattern: /^\S+$/,
        message: 'Email не должен содержать пробелы',
      },
      {
        type: 'hasAtSymbol',
        pattern: /@/,
        message: 'Отсутствует символ @',
      },
      {
        type: 'atSymbolPosition',
        pattern: /^[^@]+@[^@]+$/,
        message: 'Символ @ должен быть между другими символами',
      },
      {
        type: 'domainPart',
        pattern: /@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Некорректная доменная часть email',
      },
      {
        type: 'latin',
        pattern: /^[a-zA-Z0-9._%+-@]+$/,
        message:
          'Разрешены только латинские символы, цифры и специальные знаки',
      },
      {
        type: 'length',
        pattern: /^.{6,50}$/,
        message: 'Email должен содержать от 6 до 50 символов',
      },
      {
        type: 'noLeadingHyphen',
        pattern: /^[a-zA-Z0-9]/,
        message: 'Домен не может начинаться с дефиса',
      },
      {
        type: 'noDoubleHyphens',
        pattern: /^(?!.*--)/,
        message: 'Запрещено использовать два дефиса подряд',
      },
    ],
  },
  login: {
    required: true,
    validators: [
      {
        type: 'required',
        pattern: /^.+$/,
        message: 'Поле обязательно для заполнения',
      },
      {
        type: 'length',
        pattern: /^.{6,}$/,
        message: 'Минимум 6 символов',
      },
      {
        type: 'noSpaces',
        pattern: /^\S+$/,
        message: 'Логин не должен содержать пробелы',
      },
    ],
  },
  password: {
    required: true,
    validators: [
      {
        type: 'required',
        pattern: /^.+$/,
        message: 'Поле обязательно для заполнения',
      },
      {
        type: 'length',
        pattern: /^.{6,}$/,
        message: 'Минимум 6 символов',
      },
      {
        type: 'noSpaces',
        pattern: /^\S+$/,
        message: 'Пароль не должен содержать пробелы',
      },
    ],
  },
};

// Тип функции для валидации поля
type TValidateField = (value: string, fieldName: string) => string | null;

// Функция валидации поля
export const validateField: TValidateField = (value, fieldName) => {
  // Получаем правила валидации для указанного поля из объекта validationRules
  const fieldRules = validationRules[fieldName].validators;

  // Проходим по всем правилам валидации для данного поля
  for (const rule of fieldRules) {
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
