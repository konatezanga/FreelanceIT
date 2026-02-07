<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\FreelancerProfile;
use App\Models\ClientProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Inscription
    public function register(Request $request)
    {
        $validated = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
            'role' => 'required|in:client,freelance',
            // Champs spécifiques freelance
            'institution' => 'nullable|required_if:role,freelance|string',
            // Champs spécifiques client
            'company_name' => 'nullable|string',
        ]);

        $user = User::create([
            'firstname' => $validated['firstname'],
            'lastname' => $validated['lastname'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        if ($validated['role'] === 'freelance') {
            FreelancerProfile::create([
                'user_id' => $user->id,
                'institution' => $validated['institution'] ?? null,
            ]);
        } else {
            ClientProfile::create([
                'user_id' => $user->id,
                'company_name' => $validated['company_name'] ?? null,
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user->load(['freelancerProfile', 'clientProfile']),
            'token' => $token,
        ], 201);
    }

    // Connexion
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants sont incorrects.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user->load(['freelancerProfile', 'clientProfile']),
            'token' => $token,
        ]);
    }

    // Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnexion réussie']);
    }

    // Utilisateur courant
    public function user(Request $request)
    {
        return $request->user()->load(['freelancerProfile', 'clientProfile']);
    }

    // Mise à jour du profil
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        // Validation simple pour l'exemple (à renforcer)
        $validated = $request->validate([
            'phone' => 'nullable|string',
            'company_name' => 'nullable|string',
            'address' => 'nullable|string',
            'website' => 'nullable|string',
            'current_password' => 'nullable|required_with:password',
            'password' => 'nullable|min:8|confirmed',
        ]);

        if (isset($validated['password'])) {
            if (!Hash::check($validated['current_password'], $user->password)) {
                throw ValidationException::withMessages([
                    'current_password' => ['Le mot de passe actuel est incorrect.'],
                ]);
            }
            $user->password = Hash::make($validated['password']);
        }

        if (isset($validated['phone'])) {
            $user->phone = $validated['phone'];
        }

        $user->save();

        // Mise à jour profil client
        if ($user->role === 'client' && $user->clientProfile) {
            $user->clientProfile->update([
                'company_name' => $validated['company_name'] ?? $user->clientProfile->company_name,
                'address' => $validated['address'] ?? $user->clientProfile->address,
                'website' => $validated['website'] ?? $user->clientProfile->website,
            ]);
        }

        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            'user' => $user->load(['freelancerProfile', 'clientProfile']),
        ]);
    }
}
