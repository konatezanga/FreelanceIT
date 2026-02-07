<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->has('role')) {
            $query->where('role', $request->role); // ex: 'freelance'
        }

        // Include profile relationships
        $query->with(['freelancerProfile', 'clientProfile']);

        return $query->get();
    }

    public function show($id)
    {
        return User::with(['freelancerProfile', 'clientProfile'])->findOrFail($id);
    }
}
