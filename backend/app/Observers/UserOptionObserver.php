<?php

namespace App\Observers;

use App\Models\userOption;
use Ramsey\Uuid\Uuid;

class UserOptionObserver
{
	public function creating(userOption $userOption)
	{

		$userOption->id = Uuid::uuid4();
	}
}