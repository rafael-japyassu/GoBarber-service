import { resolve } from 'path';
import { randomBytes } from 'crypto';
import { diskStorage, Options } from 'multer';

export default {
  storage: diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp'),
    filename(request, file, callback) {
      const fileHash = randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
} as Options;
