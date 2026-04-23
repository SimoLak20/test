import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional if using social login later
  role: 'Administrateur' | 'Profeseur' | 'Etudiant' | 'Utilisateur';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Administrateur', 'Profeseur', 'Etudiant', 'Utilisateur'], 
    default: 'Etudiant' 
  }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);