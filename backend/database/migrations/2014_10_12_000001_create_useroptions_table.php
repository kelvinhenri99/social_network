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
		Schema::create('useroptions', function (Blueprint $table) {
			$table->uuid('id');
			$table->uuid('user_id');
			$table->string('image')->default('not_found.webp');
			$table->string('background')->nullable();
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
		Schema::dropIfExists('useroptions');
	}
};