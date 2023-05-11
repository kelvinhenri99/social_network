<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class userOption extends Model
{
	protected $keyType = 'string';
	public $incrementing = false;
	protected $primaryKey = 'id';
	protected $guarded = [];
	protected $table = 'useroptions';
}