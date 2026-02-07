<?php

namespace App\Http\Controllers;

use App\Models\Mission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MissionController extends Controller
{
    public function index()
    {
        // Retourne toutes les missions (ou filtrer par status 'open')
        return Mission::with('client')->orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'budget' => 'required|numeric',
            'deadline' => 'required|date',
        ]);

        $mission = Mission::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'budget' => $validated['budget'],
            'deadline' => $validated['deadline'],
            'user_id' => Auth::id(), // Le client connecté
            'status' => 'open',
        ]);

        return response()->json($mission, 201);
    }

    public function show(Mission $mission)
    {
        return $mission->load('client');
    }

    public function update(Request $request, Mission $mission)
    {
        // Vérifier que c'est bien le propriétaire
        if ($mission->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'budget' => 'sometimes|numeric',
            'deadline' => 'sometimes|date',
            'status' => 'sometimes|in:open,in_progress,completed,cancelled',
        ]);

        $mission->update($validated);

        return $mission;
    }

    public function destroy(Mission $mission)
    {
        if ($mission->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $mission->delete();
        return response()->json(['message' => 'Mission deleted']);
    }
}
