<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('Admin/ManageUsers', [
            'users' => $users
        ]);
    }
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.users')
            ->with('success', 'User deleted successfully');
    }
}
