import * as mongoose from 'mongoose';
import { environment } from '../environment/environment';

mongoose.connect(environment.MONGODB_URI);

export default mongoose;