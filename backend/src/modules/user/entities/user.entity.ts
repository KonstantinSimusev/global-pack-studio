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

  @Column()
  salt: string;

  @Column({ name: 'hashed_password' })
  hashedPassword: string;
}
