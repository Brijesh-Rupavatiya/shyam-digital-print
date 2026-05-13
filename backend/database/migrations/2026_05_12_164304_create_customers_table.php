<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {

            $table->id();

            // customer / company name
            $table->string('customer_name');

            // local or regular
            $table->enum('customer_type', ['local', 'regular']);

            // optional fields
            $table->string('phone')->nullable();

            $table->text('address')->nullable();

            $table->timestamps();

            // INDEXES
            $table->index('customer_name');

            $table->index('customer_type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};