<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
	public function index()
	{
		$users = (new User)->users();

		return UserResource::collection($users);
	}
	public function show($id)
	{
		$user = User::findOrFail($id);

		return new UserResource($user);
	}
	public function update(UserRequest $request, $id)
	{
		$user = User::findOrFail($id);

		$data = $request->all();
		$data['password'] = bcrypt($request->password);
		$user->update($data);

		return new UserResource($user);
	}
}