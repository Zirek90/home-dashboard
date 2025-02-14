import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { FileEntity } from './file.entity';

@Entity('directories')
export class DirectoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column('text')
  path: string;

  @ManyToOne(() => UserEntity, (user) => user.directories, { nullable: true })
  owner: UserEntity | null; // Owner of the directory (null for public directories)

  @Column({ default: false })
  isPublic: boolean;

  @OneToMany(() => FileEntity, (file) => file.directory)
  files: FileEntity[];

  @CreateDateColumn()
  createdAt: Date;

  constructor(
    id: string,
    name: string,
    path: string,
    owner: UserEntity | null,
    isPublic: boolean,
    files: FileEntity[],
    createdAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.owner = owner;
    this.isPublic = isPublic;
    this.files = files;
    this.createdAt = createdAt;
  }
}
