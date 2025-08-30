import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  // Используем PrimaryGeneratedColumn для автоматического создания UUID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true, // логин должен быть уникальным
  })
  login: string;

  @Column({
    type: 'varchar',
    length: 32, // типичная длина соли
    nullable: false,
  })
  salt: string;

  @Column({
    name: 'hashed_password',
    type: 'varchar',
    length: 256, // типичная длина хэша
    nullable: false,
  })
  hashedPassword: string;

  // Важно указать nullable: true
  @Column({
    name: 'refresh_token',
    type: 'varchar',
    length: 512, // увеличьте длину, если токены длинные
    nullable: true, // разрешаем NULL значения
  })
  refreshToken: string | null; // указываем, что может быть null
}
