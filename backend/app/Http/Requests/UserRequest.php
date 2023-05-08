<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UserRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	public function rules(): array
	{
		return [
			'name' => [
				'required',
				'min:3',
				'max:255'
			],
			'username' => [
				'required',
			],
			'email' => [
				'required',
				'email',
				'max:255',
				'unique:users'
			],
			'password' => [
				'required',
				'min:6',
				'max:255'
			],
		];
		/*         return [
		'email' => [
		'required', 'unique:users,email,' . optional($this->user)->id,
		],
		'username' => [
		'required', 'unique:users,username,' . optional($this->user)->id,
		],
		'name' => ['required'],
		'password' => (empty($this->user->password)) ? ['required', Password::defaults()] : '',
		'address' => ['required'],
		]; */
	}
}
