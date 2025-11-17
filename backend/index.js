require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Middleware
app.use(cors());
app.use(express.json());

// SIGNUP ROUTE
app.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Create user in Supabase
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name
        }
      }
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ 
      message: 'Signup successful! Check your email to verify.',
      user: data.user 
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// LOGIN ROUTE
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Login with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ 
      message: 'Login successful!',
      user: data.user,
      session: data.session
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

// FORGOT PASSWORD ROUTE
app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Send password reset email
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/reset-password'
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ 
      message: 'Password reset email sent! Check your inbox.' 
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error during password reset' });
  }
});

// RESET PASSWORD ROUTE
app.post('/reset-password', async (req, res) => {
  try {
    const { newPassword } = req.body;

    // Update password
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ 
      message: 'Password updated successfully!' 
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error during password update' });
  }
});

// Test route
app.get('/', (req, res) => {
  res.send('Homework Helper API is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});