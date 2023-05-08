<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		Schema::create('usersoptions', function (Blueprint $table) {
			$table->uuid('id');
			$table->uuid('user_id');
			$table->string('image')->nullable();
			$table->string('background')->nullable();
			$table->date('date_birth')->nullable();
			$table->text('biography')->nullable();
			$table->string('gender')->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('usersoptions');
	}
};
