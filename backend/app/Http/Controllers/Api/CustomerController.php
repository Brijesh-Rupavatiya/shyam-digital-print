<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Customer List
     */
    public function index(Request $request)
    {
        $query = Customer::query();

        // Search by customer/company name
        if ($request->filled('search')) {
            $query->where('customer_name', 'like', '%' . $request->search . '%');
        }

        // Filter by customer type
        if ($request->filled('customer_type')) {
            $query->where('customer_type', $request->customer_type);
        }

        // Latest first
        $query->latest();

        // Pagination
        $customers = $query->paginate(20);

        return response()->json($customers);
    }

    /**
     * Create Customer
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_type' => 'required|in:local,regular',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ]);

        $customer = Customer::create($validated);

        return response()->json([
            'message' => 'Customer created successfully',
            'customer' => $customer
        ], 201);
    }

    /**
     * Show Single Customer
     */
    public function show($id)
    {
        $customer = Customer::findOrFail($id);

        return response()->json($customer);
    }

    /**
     * Update Customer
     */
    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);

        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_type' => 'required|in:local,regular',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ]);

        $customer->update($validated);

        return response()->json([
            'message' => 'Customer updated successfully',
            'customer' => $customer
        ]);
    }

    /**
     * Delete Customer
     */
    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);

        $customer->delete();

        return response()->json([
            'message' => 'Customer deleted successfully'
        ]);
    }
}