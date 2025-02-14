import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { DirectoryEntity } from './directory.entity';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column('text')
  path: string;

  @Column('bigint')
  size: number;

  @ManyToOne(() => UserEntity, (user) => user.files)
  uploadedBy: UserEntity;

  @ManyToOne(() => DirectoryEntity, (directory) => directory.files, {
    nullable: true,
  })
  directory: DirectoryEntity | null; // Directory the file belongs to

  @CreateDateColumn()
  createdAt: Date;

  constructor(
    id: string,
    name: string,
    path: string,
    size: number,
    uploadedBy: UserEntity,
    directory: DirectoryEntity | null,
    createdAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.size = size;
    this.uploadedBy = uploadedBy;
    this.directory = directory;
    this.createdAt = createdAt;
  }
}
