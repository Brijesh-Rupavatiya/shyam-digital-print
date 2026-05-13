<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    protected $fillable = [
        'customer_name',
        'customer_type',
        'phone',
        'address',
    ];

    /**
     * One customer has many entries
     */
    public function entries(): HasMany
    {
        return $this->hasMany(CustomerEntry::class);
    }
}