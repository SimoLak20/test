import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash the password (security requirement!)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user based on your Class Diagram roles
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role // Administrateur, Profeseur, or Etudiant
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." });

    // 2. Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password!);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Mot de passe incorrect." });

    // 3. Generate JWT (Valid for 1 hour)
    const token = jwt.sign(
      { email: user.email, id: user._id, role: user.role },
      'test_secret_key', // You should put this in your .env later
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue." });
  }
};