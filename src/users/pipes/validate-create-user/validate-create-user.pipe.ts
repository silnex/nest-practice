import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/create-user.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log('Inside vcu');
    console.log(value);
    console.log(metadata);

    return value;
    // const parseAgeToInt = parseInt(value.age.toString());
    // if (isNaN(parseAgeToInt)) {
    //   console.log(`${value.age} is not a number`);
    //   throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    // }

    // console.log(`${parseAgeToInt} is a number`);

    // return {
    //   ...value,
    //   age: parseAgeToInt,
    // };
  }
}
