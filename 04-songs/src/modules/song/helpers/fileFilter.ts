import { BadRequestException } from '@nestjs/common';

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file) {
    return callback(new BadRequestException('File is empty'), false);
  }

  const allowedMimeTypes = [
    'audio/mpeg', // MP3
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(
      new BadRequestException('File uploaded is not allowed. Only audio files'),
      false,
    );
  }

  callback(null, true);
};