<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerEntry extends Model
{
    protected $fillable = [
        'customer_id',
        'entry_date',
        'card_sheet',
        'sticker',
        'size',
        'lamination',
        'full_cut',
        'plotter_cut',
        'quantity',
        'amount',
        'payment_status',
        'remark',
    ];

    protected $casts = [
        'entry_date' => 'datetime',
        'amount' => 'decimal:2',
    ];

    /**
     * Entry belongs to customer
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}