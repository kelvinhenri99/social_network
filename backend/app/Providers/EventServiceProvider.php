<?php

namespace App\Providers;

use App\Models\User;
use App\Models\userOption;
use App\Observers\UserObserver;
use App\Observers\UserOptionObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
	protected $listen = [
		Registered::class => [
			SendEmailVerificationNotification::class,
		],
	];
	public function boot()
	{
		User::observe(UserObserver::class);
		userOption::observe(UserOptionObserver::class);
	}
	public function shouldDiscoverEvents(): bool
	{
		return false;
	}
}