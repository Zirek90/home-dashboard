import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { FileEntity } from './file.entity';
import { DirectoryEntity } from './directory.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  admin: boolean;

  @OneToMany(() => FileEntity, (file) => file.uploadedBy)
  files: FileEntity[];

  @OneToMany(() => DirectoryEntity, (directory) => directory.owner)
  directories: DirectoryEntity[];

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    id: string,
    username: string,
    email: string,
    password: string,
    admin: boolean,
    files: FileEntity[],
    directories: DirectoryEntity[],
    avatar: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.admin = admin;
    this.files = files;
    this.directories = directories;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
