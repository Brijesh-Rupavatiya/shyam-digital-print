<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('customer_entries', function (Blueprint $table) {

            $table->id();

            // RELATION
            $table->foreignId('customer_id')
                ->constrained()
                ->cascadeOnDelete();

            // entry datetime
            $table->dateTime('entry_date');

            // printing details
            $table->string('card_sheet')->nullable();

            $table->string('sticker')->nullable();

            $table->string('size')->nullable();

            $table->enum('lamination', [
                'gloss',
                'matt',
                'none'
            ])->default('none');

            $table->string('full_cut')->nullable();

            $table->string('plotter_cut')->nullable();

            // quantity
            $table->integer('quantity')->default(1);

            // money
            $table->decimal('amount', 10, 2);

            // payment status
            $table->enum('payment_status', [
                'pending',
                'complete'
            ])->default('complete');

            // remake note
            $table->text('remark')->nullable();

            $table->timestamps();

            // INDEXES
            $table->index('entry_date');

            $table->index('payment_status');

            $table->index('amount');

            $table->index('customer_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_entries');
    }
};