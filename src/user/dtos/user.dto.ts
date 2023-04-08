export class CreateUserDto {
  id?: number;
  name: string;
  profilePic?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
