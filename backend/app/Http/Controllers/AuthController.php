<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\userOption;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth:api', ['except' => ['login', 'register']]);
	}

	public function login(Request $request): JsonResponse
	{
		try {
			$validator = Validator::make($request->all(), [
				'email' => 'required|email',
				'password' => 'required|string|min:6',
			]);

			if ($validator->fails()) {
				return response()->json(['errors' => $validator->errors()], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
			}

			if (!$token = Auth::attempt($validator->validated())) {
				return response()->json(['errors' => [Lang::get('auth.failed')]], JsonResponse::HTTP_UNAUTHORIZED);
			}

			return $this->createNewToken($token);
		} catch (\Exception $e) {
			return response()->json(['errors' => [$e->getMessage()]], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
		}
	}
	public function register(Request $request): JsonResponse
	{
		try {
			$validator = Validator::make($request->all(), [
				'name' => 'required|string|between:2,100',
				'email' => 'required|string|email|max:100|unique:users',
				'date_birth' => 'required',
				'password' => 'required|string|min:6',
			]);

			if ($validator->fails()) {
				return response()->json(['errors' => $validator->errors()], JsonResponse::HTTP_BAD_REQUEST);
			}

			$date_birth = $request->date_birth;
			$current_date = date('Y');
			$date = explode("-", $date_birth);
			$age = $current_date - (int) $date[0];

			if ($age >= 18) {
				$user = User::create(
					array_merge(
						$validator->validated(),
						[
							'password' => bcrypt($request->password)
						]
					)
				);
				$userOptions = userOption::create(
					array_merge(
						[
							'user_id' => $user->id,
						]
					)
				);
				return response()->json(['data' => new UserResource($user)], JsonResponse::HTTP_CREATED);
			}
			return response()->json(['message' => 'Você precisa ter no mínimo 18 anos']);

		} catch (\Exception $e) {
			return response()->json(['errors' => [$e->getMessage()]], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
		}
	}

	public function logout(): JsonResponse
	{
		Auth::logout();

		return response()->json(['message' => Lang::get('auth.logged_out')]);
	}

	public function refresh(): JsonResponse
	{
		return $this->createNewToken(Auth::refresh());
	}

	public function userProfile(): JsonResponse
	{
		return response()->json(['data' => new UserResource(Auth::user())]);
	}

	protected function createNewToken($token)
	{
		return response()->json([
			'access_token' => $token,
			'token_type' => 'bearer',
			'expires_in' => auth()->factory()->getTTL() * 60,
			'user' => auth()->user()
		]);
	}
}